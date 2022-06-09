import { useQuery } from "@apollo/client"
import queries from "../queries"
import useField from "../useField"

const Authors = (props) => {
	const authorName = useField('authorName', 'text')
	const birthYear = useField('birthYear', 'text')
	const result = useQuery(queries.ALL_AUTHORS)
  if (!props.show) {
    return null
  }
	if (result.loading) return <p>Loading...</p>
	
	const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
		</table>
		<h3>Set birth year</h3>
		<form>
			name
			  <input {...authorName.inputProps} />
			  born
			  <input {...birthYear.inputProps} />
			  <button type="submit">update author</button>
		</form>
    </div>
  )
}

export default Authors
