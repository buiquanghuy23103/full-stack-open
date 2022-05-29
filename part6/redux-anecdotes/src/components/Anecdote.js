import { useDispatch } from "react-redux"
import { anecdoteActionCreators } from "../reducers/anecdoteReducer"

const Anecdote = ({ anecdote }) => {
	const dispatch = useDispatch()
  
	const vote = (id) => {
	  dispatch(anecdoteActionCreators.incrementVote(id))
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

export default Anecdote