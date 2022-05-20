const express = require('express')
const app = express()
const morgan = require('morgan')
morgan.token('req-body', (request) => JSON.stringify(request.body))
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogRouter = require('./controllers/blogs')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const userRouter = require('./controllers/users')

logger.info(`Connecting to ${config.MONGODB_URI}`)
mongoose.connect(config.MONGODB_URI)
	.then(() => {
		logger.info('Connected to MongoDB')
	})
	.catch(error => {
		logger.error('Cannot connect to MongoDB', error)
	})

app.use(express.json())
app.use(morgan(':method :url :status :req-body'))
app.use(cors())

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app