import { useQuery } from "@apollo/client"
import queries from "../queries"

const Recommend = ({ show }) => {
	const currentUserQuery = useQuery(queries.CURRENT_USER)
	const favouriteGenre = !!currentUserQuery.data
		? currentUserQuery.data.me.favouriteGenre
		: null
	const { data, loading, error } = useQuery(
		queries.ALL_BOOKS,
		{
			variables: {
				genre: favouriteGenre
			}
		}
	)

	if (!show) return null
	if (currentUserQuery.loading || loading)
		return <p>Loading...</p>
	if (error)
		console.error('Error fetching books', error.message)

	const books = data.allBooks
	// const filteredBooks = books.filter(b => b.genres.includes(favouriteGenre))
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
				{books.map((a) => (
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