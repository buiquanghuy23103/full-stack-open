import { useSelector } from "react-redux"
import Anecdote from "./Anecdote"

const AnecdoteList = () => {
	const anecdotes = useSelector(state => {
		const copy = [ ...state.anecdotes ]
		return copy.sort((a, b) => b.votes - a.votes)
	})

	return (anecdotes.map(anecdote =>
		<Anecdote key={anecdote.id} anecdote={anecdote} />))
}

export default AnecdoteList