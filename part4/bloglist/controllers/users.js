const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

const generateHash = async (password) => {
	const saltRounds = 10
	return await bcrypt.hash(password, saltRounds)
}

userRouter.post('/', async (request, response) => {
	const { username, name, password } = request.body
	const passwordHash = await generateHash(password)

	const user = new User({
		name,
		username,
		passwordHash
	})

	const savedUser = await user.save()
	return response.status(201).json(savedUser)
})

userRouter.get('/', async (request, response) => {
	const users = await User.find({})
	return response.status(200).json(users)
})

module.exports = userRouter