import { connect } from 'react-redux'
import { createNew } from '../reducers/anecdoteReducer'

const AnecdoteForm = ({ createNew }) => {
	const addAnecdote = (event) => {
		event.preventDefault()
		const newAnecdote = {
			content: event.target.anecdote.value
		}
		createNew(newAnecdote)
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

const mapDispatchToProps = { createNew }

export default connect(null, mapDispatchToProps)(AnecdoteForm)