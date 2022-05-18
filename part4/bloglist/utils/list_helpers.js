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

const helpers = {
	dummy,
	totalLikes,
	favoriteBlog
}

module.exports = helpers