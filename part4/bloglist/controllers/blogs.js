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
		const { title, author, url, likes } = request.body
		const newBlog = {
			title,
			author,
			url,
			likes: likes ? likes : 0
		}
		const savedBlog = await Blog.create(newBlog)
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

blogRouter.delete('/:id', async (request, response, next) => {
	try {
		const id = request.params.id
		const result = await Blog.findByIdAndDelete(id)
		if (!result)
			return response.status(404).end()
		return response.status(204).end()
	} catch (error) {
		next(error)
	}
})

blogRouter.put('/:id', async (request, response, next) => {
	try {
		const id = request.params.id
		const result = await Blog.findByIdAndUpdate(
			id,
			request.body,
			{ new: true, runValidators: true, context: 'query' })
		if (!result)
			return response.status(404).end()
		return response.status(200).json(result)
	} catch (error) {
		next(error)
	}
})

module.exports = blogRouter