import { useQuery } from "@apollo/client"
import queries from "../queries"

const Recommend = ({ show }) => {
	const currentUserQuery = useQuery(queries.CURRENT_USER)
	const booksQuery = useQuery(queries.ALL_BOOKS)

	if (!show) return null
	if (currentUserQuery.loading || booksQuery.loading)
		return <p>Loading...</p>

	const favouriteGenre = currentUserQuery.data.me.favouriteGenre
	const books = booksQuery.data.allBooks
	console.log('books', books)
	const filteredBooks = books.filter(b => b.genres.includes(favouriteGenre))
	return (
		<>
			<h1>Recommendations</h1>
			<p>
				Books in your favourite genre:
				<strong>{favouriteGenre}</strong>
			</p>
			<table>
			<tbody>
				<tr>
					<th>Book</th>
					<th>Author</th>
					<th>Published</th>
				</tr>
				{filteredBooks.map((a) => (
					<tr key={a.title}>
					<td>{a.title}</td>
					<td>{a.author.name}</td>
					<td>{a.published}</td>
					</tr>
				))}
				</tbody>
			</table>
		</>
	)
}

export default Recommend