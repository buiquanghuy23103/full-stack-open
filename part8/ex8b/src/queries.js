import { gql } from "@apollo/client";

const QUERY_ALL_AUTHORS = 'QueryAllAuthors'
const QUERY_BOOKS_BY_GENRE = 'QueryBooksByGenre'
const QUERY_ALL_BOOKS = 'QueryAllBooks'

const BOOK_DETAILS = gql`
	fragment BookDetails on Book {
			title
			published
			genres
			author {
				name
				born
			}
	}
`

export const SUB_BOOK_ADDED = gql`
	subscription {
		bookCreated {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
`

const ALL_AUTHORS = gql`
	query ${QUERY_ALL_AUTHORS}{
		allAuthors {
			name
			born
			bookCount
		}
	}
`

const BOOKS_BY_GENRE = gql`
	query ${QUERY_BOOKS_BY_GENRE}($genre: String){
		allBooks(genre: $genre) {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
`

const ALL_BOOKS = gql`
	query ${QUERY_ALL_BOOKS} {
		allBooks {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
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
			...BookDetails
		}
	}
	${BOOK_DETAILS}
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
	ALL_AUTHORS, ALL_BOOKS, ADD_BOOK, UPDATE_BIRTH_YEAR, LOGIN, CURRENT_USER,
	BOOKS_BY_GENRE
}

export default queries