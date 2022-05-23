const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const { initDb, blogsInDb, nonExistingId, validUserObjectId, validToken } = require('./test_helpers')

const api = supertest(app)

beforeEach(async () => initDb())

describe('When there are some blogs saved', () => {
	test('blogs are returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})
	
	test('all blogs are returned', async () => {
		const response = await api.get('/api/blogs')
		const allBlogs = await Blog.find({})
		expect(response.body).toHaveLength(allBlogs.length)
	})
	
	test('a specific blog within the response', async () => {
		const response = await api.get('/api/blogs')
		const titles = response.body.map(p => p.title)
		expect(titles).toContain('React patterns')
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
		const blogsAtStart = await blogsInDb()
		const authorId = await validUserObjectId()
		const newBlog = {
			author: authorId,
			title: 'Android vs iOS',
			url: 'https://abcde.com'
		}
		const token = await validToken()
		const authString = `bearer ${token}`
		await api
			.post('/api/blogs')
			.send(newBlog)
			.auth('mchan', 'pa55word')
			.set('Authorization', authString)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const blogsAtEnd = await blogsInDb()
		expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)
	})

	test('dont add blog if title is missing', async () => {
		const blogsAtStart = await blogsInDb()
		const authorId = await validUserObjectId()
		const newBlog = {
			author: authorId,
			url: 'https://abcde.com',
			likes: 2
		}
		const token = await validToken()
		const authString = `bearer ${token}`
		await api
			.post('/api/blogs')
			.set('Authorization', authString)
			.send(newBlog)
			.expect(400)
			.expect('Content-Type', /application\/json/)
	
		const blogsAtEnd = await blogsInDb()
		expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
	})
	
	test('dont add blog if url is missing', async () => {
		const blogsAtStart = await blogsInDb()
		const authorId = await validUserObjectId()
		const newBlog = {
			title: 'Title 1',
			author: authorId,
			likes: 2
		}
		const token = await validToken()
		const authString = `bearer ${token}`
		await api
			.post('/api/blogs')
			.set('Authorization', authString)
			.send(newBlog)
			.expect(400)
			.expect('Content-Type', /application\/json/)
	
		const blogsAtEnd = await blogsInDb()
		expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
	})

	test('if request.body.likes missing, default to 0', async () => {
		const blogsAtStart = await blogsInDb()
		const authorId = await validUserObjectId()
		const newBlog = {
			title: 'Title 1',
			author: authorId,
			url: 'http://abc.com'
		}
		const token = await validToken()
		const authString = `bearer ${token}`
		const result = await api
			.post('/api/blogs')
			.set('Authorization', authString)
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const blogsAtEnd = await blogsInDb()
		expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)

		const body = result.body
		expect(body.likes).toBeDefined()
		expect(body.likes).toBe(0)
	})
})

describe('Delete a blog', () => { 
	test('a blog can be deleted by id', async () => {
		const blogsAtStart = await blogsInDb()
		const firstAuthor = await User.findOne({}).populate('blogs')
		const blog = await Blog.findById(firstAuthor.blogs[0])
		const id = blog.id
		const token = await validToken()
		const authString = `bearer ${token}`
		await api
			.delete(`/api/blogs/${id}`)
			.set('Authorization', authString)
			.expect(204)
		const blogsAtEnd = await blogsInDb()
		expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
		expect(blogsAtEnd).not.toContainEqual(blog)
	})

})

describe('Update a blog', () => { 
	test('a blog can be updated by id', async () => {
		const blog = await Blog.findOne({})
		const processedBlog = blog.toJSON()
		const update = {
			likes: 10
		}
		const result = await api
			.put(`/api/blogs/${processedBlog.id}`)
			.send(update)
			.expect(200)
			.expect('Content-Type', /application\/json/)
		const expected = { ...processedBlog, likes: 10 }
		const body = result.body
		// No need to compare author id
		delete expected.author
		delete body.author
		expect(result.body).toEqual(expected)
	})

	test('return status 404 if update unexisting blog', async () => {
		const ghostBlogId = await nonExistingId()
		const update = {
			title: 'New title'
		}
		await api
			.put(`/api/blogs/${ghostBlogId}`)
			.send(update)
			.expect(404)
	})
})

describe('Authentication', () => {
	test('invalid token', async () => {
		const blogsAtStart = await blogsInDb()
		const authorId = await validUserObjectId()
		const newBlog = {
			title: 'Title 1',
			author: authorId,
			likes: 2
		}
		const token = 'this is an invalid token'
		const authString = `bearer ${token}`
		const result = await api
			.post('/api/blogs')
			.set('Authorization', authString)
			.send(newBlog)
			.expect(401)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toBe('invalid token')
		const blogsAtEnd = await blogsInDb()
		expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
	})
})

afterAll(() => {
	mongoose.connection.close()
})