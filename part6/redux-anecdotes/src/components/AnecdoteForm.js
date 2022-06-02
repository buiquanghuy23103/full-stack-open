import { connect } from 'react-redux'
import { createNew } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = ({ createNew, setNotification }) => {
	const addAnecdote = (event) => {
		event.preventDefault()
		const newAnecdote = {
			content: event.target.anecdote.value
		}
		createNew(newAnecdote)
		setNotification(`you voted '${newAnecdote.content}'`, 3)
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

const mapDispatchToProps = { createNew, setNotification }

export default connect(null, mapDispatchToProps)(AnecdoteForm)