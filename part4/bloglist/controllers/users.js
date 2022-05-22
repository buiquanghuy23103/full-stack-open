const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

const generateHash = async (password) => {
	const saltRounds = 10
	return await bcrypt.hash(password, saltRounds)
}

userRouter.post('/', async (request, response) => {
	const { username, name, password } = request.body
	if (password.length < 3)
		return response.status(412).json({
			error: 'password must be at least 3 characters'
		})
	const duplicateUser = await User.find({ username: username })
	if (duplicateUser.length > 0)
		return response.status(400).json({ error: 'username must be unique' })
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