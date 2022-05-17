const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response, next) => {
	return Blog.find({})
		.then(blogs => {
			return response.json(blogs)
		})
		.catch(error => next(error))
})

blogRouter.post('/', (request, response, next) => {
	const newBlog = request.body
	return Blog.create(newBlog)
		.then(blog => {
			return response.status(201).json(blog)
		})
		.catch(error => next(error))
})

blogRouter.get('/:id', (request, response, next) => {
	const requestId = request.params.id
	return Blog.findById(requestId)
		.then(blog => {
			if (!blog)
				return response.status(404).end()
			return response.json(blog)
		})
		.catch(error => next(error))
})

module.exports = blogRouter