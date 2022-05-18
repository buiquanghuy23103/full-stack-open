const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const { initialBlogs, blogsInDb } = require('./test_helpers')

const api = supertest(app)


beforeEach(async () => {
	await Blog.deleteMany({})
	await Blog.insertMany(initialBlogs)
})

test('blogs are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
	const response = await api.get('/api/blogs')
	expect(response.body).toHaveLength(initialBlogs.length)
})

test('a specific blog within the response', async () => {
	const response = await api.get('/api/blogs')
	const authors = response.body.map(p => p.author)
	expect(authors).toContain('Edsger W. Dijkstra')
})

test('a valid blog can be added', async () => {
	const newBlog = {
		author: 'Huy Bui',
		title: 'Android vs iOS',
		url: 'https://abcde.com'
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const blogs = await blogsInDb()
	expect(blogs.length).toBe(initialBlogs.length + 1)
})

test('dont add blog if author is missing', async () => {
	const newBlog = {
		title: 'Android vs iOS',
		url: 'https://abcde.com'
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(400)
		.expect('Content-Type', /application\/json/)

	const blogs = await blogsInDb()
	expect(blogs.length).toBe(initialBlogs.length)
})

afterAll(() => {
	mongoose.connection.close()
})