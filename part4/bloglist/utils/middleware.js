const logger = require('./logger')

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

const middleware = {
	errorHandler,
	unknownEndpoint
}

module.exports = middleware