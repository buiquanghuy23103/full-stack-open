import { gql } from "@apollo/client";

const ALL_AUTHORS = gql`
	query {
		allAuthors {
			name
			born
			bookCount
		}
	}
`

const ALL_BOOKS = gql`
	query {
		allBooks {
			title
			published
			genres
			author {
				name
				born
			}
		}
	}
`

const ADD_BOOK = gql`
	mutation AddBook(
		$title: String!
		$published: Int!
		$author: String!
		$genres: [String!]!
	){
		addBook(
			title: $title
			author: $author
			published: $published
			genres: $genres
		) {
			title
			author {
				name
				born
			}
			published
			genres
		}
	}
`

const UPDATE_BIRTH_YEAR = gql`
	mutation UpdateBirthYear(
		$author: String!
		$born: Int!
	) {
		editAuthor(
			name: $author
			setBornTo: $born
		) {
			name
			born
		}
	}
`

const LOGIN = gql`
	mutation Login(
		$username: String!
		$password: String!
	) {
		login(
			username: $username
			password: $password
		) {
			value
		}
	}
`

const CURRENT_USER = gql`
	query CurrentUser {
		me {
			username
			favouriteGenre
		}
	}
`

const queries = {
	ALL_AUTHORS, ALL_BOOKS, ADD_BOOK, UPDATE_BIRTH_YEAR, LOGIN, CURRENT_USER
}

export default queries