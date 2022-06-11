require('dotenv').config()
const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'not so secret'

mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
	.then(() => console.log('connected to mongo db'))
	.catch(console.error)

const typeDefs = gql`
	type Book {
		title: String!
		published: Int!
		author: Author!
		id: ID!
		genres: [String!]!
	}

	type Author {
		name: String!
		born: Int
	}

	type Token {
		value: String!
	}

	type User {
		username: String!
		favouriteGenre: String!
		id: ID!
	}

	type Query {
		bookCount: Int!
		authorCount: Int!
		allBooks(author: String, genre: String): [Book!]!
		allAuthors: [Author!]!
		me: User
	}
	
	type Mutation {
		addBook(
			title: String!
			published: Int!
			author: String!
			genres: [String!]!
		): Book
		addAuthor(
			name: String!
			born: Int
		): Author
		editAuthor(name: String, setBornTo: Int): Author
		createUser(
			username: String!
			favouriteGenre: String!
		): User
		login(
			username: String!
			password: String!
		): Token
		deleteBook(
			title: String!
		): Book
	}
`

const resolvers = {
	Query: {
		bookCount: async () => Book.collection.countDocuments(),
		authorCount: async () => Author.collection.countDocuments(),
		allBooks: async (root, args) => {
			return Book.find().catch(error => {
				throw new UserInputError(error.message, {
					invalidArgs: args
				})
			})
		},
		allAuthors: async () => Author.find({}),
		me: (root, args, context) => context.user
	},
	Mutation: {
		addBook: async (root, args, context) => {
			if (!context.user)
				throw new AuthenticationError('invalid token')
			const author = await Author.findOne({ name: args.author })
			if (!author)
				throw new UserInputError('invalid author', {
					invalidArgs: [args.author]
				})
			return Book.create({ ...args, author: author.id })
				.catch(error => {
					throw new UserInputError(error.message, {
						invalidArgs: args
					})
				})
		},
		deleteBook: async (root, args) => {
			return Book.findOneAndDelete({ title: args.title })
		},
		addAuthor: async (root, args) => {
			return Author.create(args)
				.catch(error => {
					throw new UserInputError(error.message, {
						invalidArgs: args
					})
				})
		},
		editAuthor: async (root, args, context) => {
			if (!context.user)
				throw new AuthenticationError('invalid token')
			const { name } = args
			try {
				const newAuthor = await Author.findOneAndUpdate(
					{ name },
					{ born: args.setBornTo },
					{ new: true }
				)
				if (!newAuthor)
					throw new UserInputError('author not found', {
						invalidArgs: args.author
					})
				return newAuthor
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args
				})	
			}
		},
		createUser: async (root, args) => {
			const user = new User(args)
			return user.save()
				.catch(error => {
					throw new UserInputError(error.message, {
						invalidArgs: args
					})
				})
		},
		login: async (root, args) => {
			const user = await User.findOne({ username: args.username })
			if (!user || args.password !== 'secret')
				throw new AuthenticationError('wrong credentials')
			const userForToken = {
				username: user.username,
				id: user._id
			}
			return {
				value: jwt.sign(userForToken, JWT_SECRET)
			}
		}
	}
}

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