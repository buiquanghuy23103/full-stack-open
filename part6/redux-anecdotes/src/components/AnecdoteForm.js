import { useDispatch } from 'react-redux'
import { createNew } from '../reducers/anecdoteReducer'
import { notificationActions } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
	const dispatch = useDispatch()

	const addAnecdote = (event) => {
		event.preventDefault()
		const newAnecdote = {
			content: event.target.anecdote.value
		}
		dispatch(createNew(newAnecdote))
		dispatch(notificationActions.vote(newAnecdote))
		setTimeout(() => dispatch(notificationActions.clear()), 2000)
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