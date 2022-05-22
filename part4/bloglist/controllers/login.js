const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
	const { username, password } = request.body
	const user = await User.findOne({ username })
	console.log('request.body: ', request.body)
	console.log('user: ', user)
	const passwordCorrect = user
		&& await bcrypt.compare(password, user.passwordHash)
	if (!passwordCorrect)
		return response.status(401).json({
			error: 'username or password is not correct'
		})
	const userForToken = {
		username,
		id: user._id
	}
	const token = jwt.sign(userForToken, process.env.SECRET)
	return response.status(200).json({
		token, username, name: user.name
	})
})

module.exports = loginRouter