const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogRouter.get('/', async (request, response, next) => {
	try {
		const blogs = await Blog.find({}).populate('author')
		return response.status(200).json(blogs)
	} catch (error) {
		next(error)
	}
})

blogRouter.post('/', userExtractor, async (request, response, next) => {
	try {
		const author = request.user
		const { title, url, likes } = request.body
		const newBlog = {
			title,
			author: author._id,
			url,
			likes: likes ? likes : 0
		}
		const savedBlog = await Blog.create(newBlog)
		const populatedBlog = await Blog.populate(savedBlog, { path: 'author' })
		author.blogs = author.blogs.concat(savedBlog._id)
		author.save()
		return response.status(201).json(populatedBlog)
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

blogRouter.delete('/:id', userExtractor, async (request, response, next) => {
	try {
		const author = request.user
		const ownBlogs = author.blogs.map(objectId => objectId.toString())
		const id = request.params.id
		if (!ownBlogs.includes(id))
			return response.status(401).json({
				error: 'unauthorized to delete the blog'
			})
		const result = await Blog.findByIdAndDelete(id)
		author.blogs = author.blogs.filter(objectId =>
			objectId.toString() !== id
		)
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