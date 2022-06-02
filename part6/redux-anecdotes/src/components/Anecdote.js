import { connect } from "react-redux"
import { voteMore } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const Anecdote = ({ anecdote, voteMore, setNotification }) => {
	const vote = () => {
		voteMore(anecdote.id)
		const message = `you voted ${anecdote.content}`
		setNotification(message, 5)
	}

	return (
		<div key={anecdote.id}>
			<div>
				{anecdote.content}
			</div>
			<div>
				has {anecdote.votes}
				<button onClick={() => vote(anecdote.id)}>vote</button>
			</div>
		</div>
	)
}

const mapDispatchToProps = { voteMore, setNotification }

export default connect(null, mapDispatchToProps)(Anecdote)