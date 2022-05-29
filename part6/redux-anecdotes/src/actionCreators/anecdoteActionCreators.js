const incrementVote = (id) => ({
	type: 'INCREMENT_VOTE',
	data: { id }
})

const anecdoteActionCreators = {
	incrementVote
}

export default anecdoteActionCreators