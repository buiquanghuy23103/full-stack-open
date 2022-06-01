import { useDispatch } from "react-redux"
import { voteMore } from "../reducers/anecdoteReducer"

const Anecdote = ({ anecdote }) => {
	const dispatch = useDispatch()
  
	const vote = (id) => {
	  dispatch(voteMore(id))
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