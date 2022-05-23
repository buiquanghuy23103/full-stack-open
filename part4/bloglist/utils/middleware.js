const logger = require('./logger')
const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')
const User = require('../models/user')

const errorHandler = (error, request, response, next) => {
	logger.error(error)
	if (error.name === 'CastError')
		return response.status(400).json({ error: 'malformed id' })
	else if (error.name === 'ValidationError')
		return response.status(400).json({ error: error.message })
	else if (error.name === 'JsonWebTokenError')
		return response.status(401).json({ error: 'invalid token' })
	next(error)
}

const unknownEndpoint = (request, response) => {
	return response.status(404).json({ error: 'Unknown endpoint' })
}

const getTokenFrom = (request) => {
	const auth = request.get('authorization')
	const bearer = auth && auth.toLowerCase().startsWith('bearer')
	return (bearer ? auth.substring(7) : null)
}

const userExtractor = async (request, response, next) => {
	try {
		const token = getTokenFrom(request)
		if (!token)
			return response.status(401).json({
				error: 'token is missing'
			})
		const decodedToken = jwt.verify(token, SECRET)
		if (!decodedToken || !decodedToken.id)
			return response.status(401).json({
				error: 'token is invalid'
			})
		const user = await User.findById(decodedToken.id)
		if (!user)
			return response.status(404).json({
				error: 'user not found'
			})
		request.user = user
	} catch (error) {
		next(error)
	}
	next()
}

const middleware = {
	errorHandler,
	unknownEndpoint,
	userExtractor
}

module.exports = middleware