require('dotenv').config()
const { ApolloServer, gql } = require('apollo-server')
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
			const foundAuthor = await Author.find({ name: author })
			return Book.find({
				author: foundAuthor.id,
				genre: { $in: [genre] }
			})
		},
		allAuthors: async () => Author.find({})
	},
	Mutation: {
		addBook: async (root, args) => {
			const author = await Author.find({ name: args.author })
			return Book.create({ ...args, author: author.id })
		},
		addAuthor: async (root, args) => {
			return Author.create(args)
		},
		editAuthor: async (root, args) => {
			const authorQuery = args.name
			return Author.findOneAndUpdate(
				{ name: authorQuery },
				{ born: args.setBornTo }
			)
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