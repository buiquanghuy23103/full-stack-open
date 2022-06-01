import { createSlice } from "@reduxjs/toolkit"
import service from "../service"

const getId = () => (100000 * Math.random()).toFixed(0)

const incrementVote = (state, action) => {
	const id = action.payload
	const anecdote = state.find(a => a.id === id)
	anecdote.votes++
}

const addAnecdote = (state, action) => {
	const newAnecdote = {
		id: getId(),
		content: action.payload.content,
		votes: 0
	}
	state.push(newAnecdote)
}

const setAnecdotes = (state, action) => {
	return action.payload
}

const anecdoteSlice = createSlice({
	name: 'anecdote',
	initialState: [],
	reducers: {
		incrementVote,
		addAnecdote,
		setAnecdotes
	}
})

export const fetchAnecdotes = () => {
	return async dispatch => {
		const anecdotes = await service.getAll()
		dispatch(setAnecdotes(anecdotes))
	}
}

export const anecdoteActions = anecdoteSlice.actions

const anecdoteReducer = anecdoteSlice.reducer
export default anecdoteReducer