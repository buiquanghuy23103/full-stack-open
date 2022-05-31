import { createSlice } from "@reduxjs/toolkit"

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

const anecdoteReducer = anecdoteSlice.reducer

export const anecdoteActions = anecdoteSlice.actions

export default anecdoteReducer