const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const BOOK_ADDED = 'BOOK_ADDED'

const resolvers = {
	Book: {
		author: async root => Author.findById(root.author._id.toString())
	},
	Author: {
		bookCount: async root => {
			const books = await Book.find({ author: root._id })
			return books.length
		}
	},
	Query: {
		bookCount: async () => Book.collection.countDocuments(),
		authorCount: async () => Author.collection.countDocuments(),
		allBooks: async (root, args) => {
			const { author, genre } = args
			const foundAuthor = await Author.findOne({ name: author })
			const query = {}
			if (foundAuthor)
				query.author = foundAuthor._id
			if (genre)
				query.genres = { $in: [genre] }
			return Book.find(query)
				.catch(error => {
				throw new UserInputError(error.message, {
					invalidArgs: args
				})
			})
		},
		allAuthors: async () => Author.find({}),
		me: (root, args, context) => context.user
	},
	Subscription: {
		bookCreated: {
			subscribe: () => pubsub.asyncIterator([ BOOK_ADDED ])
		}
	},
	Mutation: {
		addBook: async (root, args, context) => {
			if (!context.user)
				throw new AuthenticationError('invalid token')
			try {
				const author = await Author.findOne({ name: args.author })
				if (!author)
					throw new UserInputError('invalid author', {
						invalidArgs: [args.author]
					})
				const book = new Book({ ...args, author: author._id })
				await book.save()
			} catch (error) {
				throw new UserInputError(error.message, {
						invalidArgs: args
				})
			}
			pubsub.publish(BOOK_ADDED, { bookCreated: book })
			return book
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

module.exports = resolvers