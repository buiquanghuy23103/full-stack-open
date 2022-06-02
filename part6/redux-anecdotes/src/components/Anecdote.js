import { connect } from "react-redux"
import { voteMore } from "../reducers/anecdoteReducer"

const Anecdote = ({ anecdote, voteMore }) => {
	const vote = (id) => {
	  voteMore(id)
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

const mapDispatchToProps = { voteMore }

export default connect(null, mapDispatchToProps)(Anecdote)