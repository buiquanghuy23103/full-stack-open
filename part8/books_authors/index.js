require('dotenv').config()
const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/Author')
const Book = require('./models/Book')

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

	type Query {
		bookCount: Int!
		authorCount: Int!
		allBooks(author: String, genre: String): [Book!]!
		allAuthors: [Author!]!
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
	}
`

const resolvers = {
	Query: {
		bookCount: async () => Book.collection.countDocuments(),
		authorCount: async () => Author.collection.countDocuments(),
		allBooks: async (root, args) => {
			const { author, genre } = args
			const foundAuthor = await Author.findOne({ name: author })
			if (!foundAuthor)
				throw new UserInputError('author not found', {
					invalidArgs: args.author
				})
			try {
				return Book.find({
					author: foundAuthor.id,
					genre: { $in: [genre] }
				})
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args
				})
			}
		},
		allAuthors: async () => Author.find({})
	},
	Mutation: {
		addBook: async (root, args) => {
			const author = await Author.findOne({ name: args.author })
			if (!author)
				throw new UserInputError('invalid author', {
					invalidArgs: [args.author]
				})
			try {
				return Book.create({ ...args, author: author.id })
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args
				})
			}
		},
		addAuthor: async (root, args) => {
			try {
				return Author.create(args)
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args
				})
			}
		},
		editAuthor: async (root, args) => {
			const { name } = args
			try {
				const newAuthor = await Author.findOneAndUpdate(
					{ name },
					{ born: args.setBornTo },
					{ new: true }
				)
				console.log('newAuthor', newAuthor)
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
		}
	}
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})