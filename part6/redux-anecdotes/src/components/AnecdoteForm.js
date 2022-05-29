import { useDispatch } from 'react-redux'
import { anecdoteActionCreators } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
	const dispatch = useDispatch()

	const addAnecdote = (event) => {
		event.preventDefault()
		const newAnecdote = {
			content: event.target.anecdote.value
		}
		dispatch(anecdoteActionCreators.addAnecdote(newAnecdote))
	}
	return (
		<div>
			<h2>Create new</h2>
			<form onSubmit={addAnecdote}>
				<div><input name='anecdote' /></div>
				<button type='submit'>create</button>
			</form>
		</div>
	)
}

export default AnecdoteForm