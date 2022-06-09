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
			author
			published
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
			author
			published
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

const queries = {
	ALL_AUTHORS, ALL_BOOKS, ADD_BOOK, UPDATE_BIRTH_YEAR
}

export default queries