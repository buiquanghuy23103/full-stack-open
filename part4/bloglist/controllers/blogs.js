const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const { getTokenFrom } = require('../utils/auth')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config')
const User = require('../models/user')

blogRouter.get('/', async (request, response, next) => {
	try {
		const blogs = await Blog.find({}).populate('author')
		return response.status(200).json(blogs)
	} catch (error) {
		next(error)
	}
})

blogRouter.post('/', async (request, response, next) => {
	try {
		const token = getTokenFrom(request)
		if (!token)
			return response.status(401).json({
				error: 'token is missing'
			})
		const decodedToken = jwt.verify(token, SECRET)
		if (!decodedToken || !decodedToken.id)
			return response.status(401).json({
				error: 'token is invalid'
			})
		const author = await User.findById(decodedToken.id)
		const { title, url, likes } = request.body
		const newBlog = {
			title,
			author: author._id,
			url,
			likes: likes ? likes : 0
		}
		const savedBlog = await Blog.create(newBlog)
		author.blogs = author.blogs.concat(savedBlog._id)
		author.save()
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