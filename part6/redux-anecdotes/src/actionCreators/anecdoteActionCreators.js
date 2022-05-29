const incrementVote = (id) => ({
	type: 'INCREMENT_VOTE',
	data: { id }
})

const addAnecdote = (newNote) => ({
	type: 'ADD_ANECDOTE',
	data: newNote
})

const anecdoteActionCreators = {
	incrementVote,
	addAnecdote
}

export default anecdoteActionCreators