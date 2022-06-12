import { useQuery } from "@apollo/client"
import { useState } from "react"
import queries from "../queries"

const Books = (props) => {
	const [genre, setGenre] = useState(null)
	const result = useQuery(queries.ALL_BOOKS)
  if (!props.show) {
    return null
  }
	
	if (result.loading) return <p>Loading...</p>

	const books = result.data.allBooks
	const filteredBooks = !genre
		? books
		: books.filter(b => b.genres.includes(genre))

	const genres = books.map(b => b.genres).flat()
	const genreSet = new Set(genres)
	const uniqueGenreArray = [...genreSet]

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
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
		  {uniqueGenreArray.map(a => (
			  <button key={a} onClick={() => setGenre(a)}>{ a }</button>
		  ))}
    </div>
  )
}

export default Books
