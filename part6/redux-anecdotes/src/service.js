import axios from "axios"

const getAll = async () => {
	const response = await axios.get('http://localhost:3001/anecdotes')
	return response.data
}

const createNew = async (anecdote) => {
	const response = await axios.post(
		'http://localhost:3001/anecdotes',
		anecdote
	)
	return response.data
}

const update = async updatedAnecdote => {
	const response = await axios.put(
		`http://localhost:3001/anecdotes/${updatedAnecdote.id}`,
		updatedAnecdote
	)
	return response.data
}

const service = {
	getAll, createNew, update
}

export default service