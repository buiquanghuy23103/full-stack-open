const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	author: {
		type: String,
		required: true
	},
	url: String,
	likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog