const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		minlength: 3
	},
	name: String,
	passwordHash: String,
	blogs: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Blog'
		}
	]
})

userSchema.set('toJSON', {
	transform: (doc, returnedObject) => {
		returnedObject.id = doc._id.toString()
		delete returnedObject.passwordHash
		delete returnedObject._id
		delete returnedObject.__v
	}
})

const User = mongoose.model('User', userSchema)

module.exports = User