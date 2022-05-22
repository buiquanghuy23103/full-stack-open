const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config')

const initDb = async () => {
	await User.deleteMany({})
	await Blog.deleteMany({})
	const passwordHash = await bcrypt.hash('pa55word', 10)
	const users = await User.create([
		{
			username: 'edijkstra',
			name: 'Edsger W. Dijkstra',
			passwordHash
		},
		{
			username: 'rmartin',
			name: 'Robert C. Martin',
			passwordHash
		},
		{
			username: 'mchan',
			name: 'Michael Chan',
			passwordHash
		}
	])

	const blogs = await Blog.create([
		{
			title: 'React patterns',
			author: users[2]._id,
			url: 'https://reactpatterns.com/',
			likes: 7
		},
		{
			title: 'Go To Statement Considered Harmful',
			author: users[0]._id,
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 5
		},
		{
			title: 'Canonical string reduction',
			author: users[0]._id,
			url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
			likes: 12
		},
		{
			title: 'First class tests',
			author: users[1]._id,
			url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
			likes: 10
		},
		{
			title: 'TDD harms architecture',
			author: users[1]._id,
			url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
			likes: 0
		},
		{
			title: 'Type wars',
			author: users[1]._id,
			url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
			likes: 2
		}
	])

	const usersWithBlogs = users.map(user => {
		const ownBlogs = blogs.filter(blog => blog.author.equals(user._id))
		user.blogs = ownBlogs.map(blog => blog._id)
		return user.save()
	})

	await Promise.all(usersWithBlogs)
}

const blogsInDb = async () => {
	const blogs = await Blog.find({})
	return blogs.map(b => b.toJSON())
}

const usersInDb = async () => {
	const users = await User.find({})
	return users.map(u => u.toJSON())
}

const validUserObjectId = async () => {
	const firstAuthor = await User.findOne({})
	return firstAuthor._id
}

const validBlogObjectId = async () => {
	const firstBlog = await Blog.findOne({})
	return firstBlog._id
}

const nonExistingId = async () => {
	const authorId = await validUserObjectId()
	const ghost = new Blog({
		title: 'abcdelee',
		author: authorId,
		url: 'http://hdjdjdd.com',
		likes: 3
	})
	await ghost.save()
	await ghost.remove()
	return ghost._id.toString()
}

const validToken = async () => {
	const firstAuthor = await User.findOne({})
	const usersForToken = {
		username: firstAuthor.username,
		id: firstAuthor._id
	}
	return jwt.sign(usersForToken, SECRET)
}

const helper = {
	initDb,
	blogsInDb,
	usersInDb,
	nonExistingId,
	validUserObjectId,
	validBlogObjectId,
	validToken
}

module.exports = helper