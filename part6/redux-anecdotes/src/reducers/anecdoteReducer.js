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
export const anecdoteActions = anecdoteSlice.actions

export const fetchAnecdotes = () => {
	return async dispatch => {
		const anecdotes = await service.getAll()
		dispatch(anecdoteActions.setAnecdotes(anecdotes))
	}
}

export const createNew = anecdote => {
	const newAnecdote = {
		votes: 0,
		content: anecdote.content,
		id: getId()
	}
	return async dispatch => {
		const response = await service.createNew(newAnecdote)
		dispatch(anecdoteActions.addAnecdote(response))
	}
}

export const voteMore = id => {
	return async (dispatch, getState) => {
		const { anecdotes } = getState()
		console.log('state.anecdotes', anecdotes);
		const changedAnecdote = { ...anecdotes.find(a => a.id === id) }
		changedAnecdote.votes++
		await service.update(changedAnecdote)
		dispatch(anecdoteActions.incrementVote(id))
	}
}

const anecdoteReducer = anecdoteSlice.reducer
export default anecdoteReducer