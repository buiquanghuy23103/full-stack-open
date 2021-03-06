const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	url: {
		type: String,
		required: true
	},
	likes: Number,
	comments: [String]
})

blogSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = document._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog