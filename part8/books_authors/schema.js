const { gql } = require('apollo-server')

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
		bookCount: Int!
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

module.exports = typeDefs