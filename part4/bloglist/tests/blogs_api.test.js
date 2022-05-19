const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const { initialBlogs, blogsInDb, nonExistingId, } = require('./test_helpers')

const api = supertest(app)


beforeEach(async () => {
	await Blog.deleteMany({})
	await Blog.insertMany(initialBlogs)
})

describe('When there are some blogs saved', () => { 
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
})

describe('Viewing a specific blog', () => { 
	test('a blog can be fetched by id', async () => {
		const blogs = await blogsInDb()
		const firstBlog = blogs[0]
		const id = firstBlog.id
		const result = await api
			.get(`/api/blogs/${id}`)
			.expect(200)
			.expect('Content-Type', /application\/json/)
		const body = result.body
		const processedBlog = JSON.parse(JSON.stringify(firstBlog))
		expect(body).toEqual(processedBlog)
	})

	test('unique identifier property of the blog posts is named id', async () => {
		const blogs = await blogsInDb()
		const firstBlog = blogs[0]
		expect(firstBlog.id).toBeDefined()
	})

	test('return status 404 if blog does not exist', async () => {
		const ghostBlogId = await nonExistingId()
		await api
			.get(`/api/blogs/${ghostBlogId}`)
			.expect(404)
	})

	test('return 400 if id is invalid', async () => {
		const invalidId = 'abcde12345'
		await api
			.get(`/api/blogs/${invalidId}`)
			.expect(400)
	})
})

describe('Add a new blog', () => { 
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

	test('dont add blog if title is missing', async () => {
		const newBlog = {
			author: 'John Doe',
			url: 'https://abcde.com',
			likes: 2
		}
	
		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(400)
			.expect('Content-Type', /application\/json/)
	
		const blogs = await blogsInDb()
		expect(blogs.length).toBe(initialBlogs.length)
	})
	
	test('dont add blog if url is missing', async () => {
		const newBlog = {
			title: 'Title 1',
			author: 'John Doe',
			likes: 2
		}
	
		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(400)
			.expect('Content-Type', /application\/json/)
	
		const blogs = await blogsInDb()
		expect(blogs.length).toBe(initialBlogs.length)
	})

	test('if request.body.likes missing, default to 0', async () => {
		const newBlog = {
			title: 'Title 1',
			author: 'John Doe',
			url: 'http://abc.com'
		}

		const result = await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)
		const body = result.body
		expect(body.likes).toBeDefined()
		expect(body.likes).toBe(0)
	})
})

describe('Delete a blog', () => { 
	test('a blog can be deleted by id', async () => {
		const blogsAtStart = await blogsInDb()
		const firstBlog = blogsAtStart[0]
		const id = firstBlog.id
		await api
			.delete(`/api/blogs/${id}`)
			.expect(204)
		const blogsAtEnd = await blogsInDb()
		expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
		expect(blogsAtEnd).not.toContainEqual(firstBlog)
	})

})

describe('Update a blog', () => { 
	test('a blog can be updated by id', async () => {
		const blogsAtStart = await blogsInDb()
		const firstBlog = blogsAtStart[0]
		const id = firstBlog.id
		const update = {
			likes: 10
		}
		const result = await api
			.put(`/api/blogs/${id}`)
			.send(update)
			.expect(200)
			.expect('Content-Type', /application\/json/)
		const expected = { ...firstBlog, likes: 10 }
		expect(result.body).toEqual(expected)
	})

	test('return status 404 if update unexisting blog', async () => {
		const ghostBlogId = await nonExistingId()
		const update = {
			author: 'Huy Bui'
		}
		await api
			.put(`/api/blogs/${ghostBlogId}`)
			.send(update)
			.expect(404)
	})
})

afterAll(() => {
	mongoose.connection.close()
})