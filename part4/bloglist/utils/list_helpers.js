const _ = require('lodash')

const dummy = (blogs) => {
	return blogs === blogs ? 1 : 0
}

const totalLikes = (blogs) => {
	return blogs.map(blog => blog.likes).reduce((sum, item) => sum + item, 0)
}

const favoriteBlog = (blogs) => {
	const max = Math.max(...blogs.map(blog => blog.likes))
	return blogs.find(blog => blog.likes === max)
}

const mostBlog = (blogs) => {
	const authorBlog = _.countBy(blogs, 'author')
	const arr = Object.entries(authorBlog)
	let max = arr[0]
	for (const item of arr) {
		if (item[1] > max[1])
			max = item
	}
	return {
		author: max[0],
		blogs: max[1]
	}
}

const helpers = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlog
}

module.exports = helpers