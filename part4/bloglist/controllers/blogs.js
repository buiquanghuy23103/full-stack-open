const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response, next) => {
	try {
		const blogs = await Blog.find({})
		return response.status(200).json(blogs)
	} catch (error) {
		next(error)
	}
})

blogRouter.post('/', async (request, response, next) => {
	try {
		const savedBlog = await Blog.create(request.body)
		return response.status(201).json(savedBlog)
	} catch (error) {
		next(error)
	}
})

blogRouter.get('/:id', async (request, response, next) => {
	try {
		const id = request.params.id
		const foundBlog = await Blog.findById(id)
		if (!foundBlog)
			return response.status(404).end()
		return response.status(200).json(foundBlog)
	} catch (error) {
		next(error)
	}
})

module.exports = blogRouter