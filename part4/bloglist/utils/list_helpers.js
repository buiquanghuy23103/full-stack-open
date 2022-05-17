const dummy = (blogs) => {
	return blogs === blogs ? 1 : 0
}

const totalLikes = (blogs) => {
	return blogs.map(blog => blog.likes).reduce((sum, item) => sum + item, 0)
}

const helpers = {
	dummy,
	totalLikes
}

module.exports = helpers