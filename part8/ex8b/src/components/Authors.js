import { useMutation, useQuery } from "@apollo/client"
import { useState } from "react"
import Select from 'react-select';
import queries from "../queries"
import useField from "../useField"

const Authors = (props) => {
	const birthYear = useField('birthYear', 'text')
	const [ selectedOption, setSelectedOption ] = useState(null)
	const result = useQuery(queries.ALL_AUTHORS)
	const [ updateBirth ] = useMutation(
		queries.UPDATE_BIRTH_YEAR,
		{
			refetchQueries: [
				{
					query: queries.ALL_AUTHORS
				}
			]
		}
	)
  if (!props.show) {
    return null
  }
	if (result.loading) return <p>Loading...</p>

	const authors = result.data.allAuthors
	const selectOptions = authors.map(author => ({
		value: author.name,
		label: author.name
	}))

	const handleSubmit = event => {
		event.preventDefault()
		updateBirth({
			variables: {
				author: selectedOption.value,
				born: Number(birthYear.value)
			}
		})
		setSelectedOption(null)
		birthYear.reset()
	}

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
		  <Select
			  value={selectedOption}
			  onChange={setSelectedOption}
			  options={selectOptions}
		  />
		<form onSubmit={handleSubmit}>
			  born
			  <input {...birthYear.inputProps} />
			  <button type="submit">update author</button>
		</form>
    </div>
  )
}

export default Authors
