import { useSelector } from "react-redux"
import Anecdote from "./Anecdote"

const AnecdoteList = () => {
	const result = useSelector(state => {
		const { anecdotes, filter } = state
		const filteredAnecdotes = anecdotes.filter(anecdote =>
			anecdote.content.toLowerCase().includes(filter))
		return filteredAnecdotes.sort((a, b) => b.votes - a.votes)
	})

	return (result.map(anecdote =>
		<Anecdote key={anecdote.id} anecdote={anecdote} />))
}

export default AnecdoteList