require('dotenv').config()
const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const User = require('./models/User')
const jwt = require('jsonwebtoken')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const JWT_SECRET = 'not so secret'

mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
	.then(() => console.log('connected to mongo db'))
	.catch(console.error)

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({ req }) => {
		const auth = req ? req.headers.authorization : null
		if (auth && auth.toLowerCase().startsWith('bearer '))
		{
			const token = auth.substring(7)
			const decodedToken = jwt.verify(token, JWT_SECRET)
			const user = await User.findById(decodedToken.id)
			return { user }
		}
	}
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})