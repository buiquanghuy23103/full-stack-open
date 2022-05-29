import { useSelector } from "react-redux"
import Anecdote from "./Anecdote"

const AnecdoteList = () => {
	const anecdotes = useSelector(state => state.sort((a, b) => b.votes - a.votes))

	return (anecdotes.map(anecdote => <Anecdote anecdote={anecdote} />))
}

export default AnecdoteList