const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

const generateHash = async (password) => {
	const saltRounds = 10
	return await bcrypt.hash(password, saltRounds)
}

userRouter.post('/', async (request, response, next) => {
	try {
		const { username, name, password } = request.body
		if (password.length < 3)
			return response.status(412).json({
				error: 'password must be at least 3 characters'
			})
		const passwordHash = await generateHash(password)
	
		const user = new User({
			name,
			username,
			passwordHash,
			blogs: []
		})
	
		const savedUser = await user.save()
		return response.status(201).json(savedUser)
	} catch (error) {
		next(error)
	}
})

userRouter.get('/', async (request, response, next) => {
	try {
		const users = await User.find({}).populate('blogs')
		return response.status(200).json(users)
	} catch (error) {
		next(error)
	}
})

module.exports = userRouter