import { useState } from "react";

const MostVote = ({anecdotes, votes}) => {
	const getMostVote = () => {
		let mostVoteIndex = 0;
		let mostVoteValue = 0;
		votes.forEach((vote, index) => {
			if (vote > mostVoteValue)
			{
				console.log()
				mostVoteValue = vote
				mostVoteIndex = index
			}
		});
		return { mostVoteIndex, mostVoteValue }
	}

	const mostVote = getMostVote()

	return (
		<>
			<h1>Anecdote with most votes</h1>
			<p>{anecdotes[mostVote.mostVoteIndex]}</p>
			<p>has {mostVote.mostVoteValue} votes</p>
		</>
	)
}

const App = () => {
	const anecdotes = [
		'If it hurts, do it more often',
		'Adding manpower to a late software project makes it later!',
		'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
		'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
		'Premature optimization is the root of all evil.',
		'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
		'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
	]
	const [selected, setSelected] = useState(0)
	const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
	const [mostVote, setMostVote] = useState({mostVoteIndex: 0, mostVoteValue: 0})

	const generateNextAnecdotes = () => {
		const nextRandomIndex = Math.floor(Math.random() * anecdotes.length);
		setSelected(nextRandomIndex);
	}
	
	const incrementVote = () => {
		const copy = [...votes]
		copy[selected]++
		setVotes(copy)
	}

	return (
		<div>
			<h1>Anecdote of the day</h1>
			<p>{anecdotes[selected]}</p>
			<p>has {votes[selected]} votes</p>
			<button onClick={incrementVote}>Vote</button>
			<button onClick={generateNextAnecdotes}>Next anecdotes</button>
			<MostVote anecdotes={anecdotes} votes={votes} />
		</div>
	);
}

export default App;
