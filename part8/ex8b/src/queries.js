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

const queries = {
	ALL_AUTHORS
}

export default queries