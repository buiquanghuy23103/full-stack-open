require('dotenv').config()
const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const User = require('./models/User')
const jwt = require('jsonwebtoken')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const JWT_SECRET = 'not so secret'

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log('connected to mongo db'))
	.catch(error => console.error('cannot connect to mongo db', error))

const start = async () => {
	const app = express()
	const httpServer = http.createServer(app)
	const schema = makeExecutableSchema({ typeDefs, resolvers })
	const server = new ApolloServer({
		schema,
		context: async ({ req }) => {
			const auth = req ? req.headers.authorization : null
			if (auth && auth.toLowerCase().startsWith('bearer '))
			{
				const token = auth.substring(7)
				const decodedToken = jwt.verify(token, JWT_SECRET)
				const user = await User.findById(decodedToken.id)
				return { user }
			}
		},
		plugins: [
			ApolloServerPluginDrainHttpServer({ httpServer })
		]
	})

	await server.start()

	server.applyMiddleware({
		app,
		path: '/'
	})

	const PORT = 4000

	httpServer.listen(PORT, () => {
		console.log(`Server is running on https://localhost:${PORT}`)
	})
}

start()