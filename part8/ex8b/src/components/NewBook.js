import { useMutation, useQuery } from '@apollo/client'
import { useState } from 'react'
import Select from 'react-select';
import queries from '../queries'

const NewBook = (props) => {
	const [addBook] = useMutation(queries.ADD_BOOK, {
		refetchQueries: [
			{ query: queries.ALL_AUTHORS }
		],
		onError: error => {
			console.log(error.graphQLErrors[0].message)
		}
	})
	const authorQuery = useQuery(queries.ALL_AUTHORS)
	const [ selectedAuthor, setSelectedAuthor ] = useState(null)
  const [title, setTitle] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  if (!props.show) {
    return null
  }
	const authors = authorQuery.data.allAuthors
	const authorOptions = authors.map(author => ({
		value: author.name,
		label: author.name
	}))
	
  const submit = async (event) => {
    event.preventDefault()

	  await addBook({
		  variables: {
			  title,
			  author: selectedAuthor.value,
			  published: Number(published),
			  genres
		  }
	  })

    setTitle('')
    setPublished('')
    setSelectedAuthor(null)
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
				  <Select
					  options={authorOptions}
					  defaultValue={selectedAuthor}
					  onChange={setSelectedAuthor}
				  />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
