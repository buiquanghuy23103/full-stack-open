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

const getTokenFrom = (request) => {
	const auth = request.get('authorization')
	const bearer = auth && auth.toLowerCase().startsWith('bearer')
	return (bearer ? auth.substring(7) : null)
}

const tokenExtractor = (request, response, next) => {
	const token = getTokenFrom(request)
	request.token = token
	next()
}

const middleware = {
	errorHandler,
	unknownEndpoint,
	tokenExtractor
}

module.exports = middleware