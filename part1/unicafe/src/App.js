import { useState } from 'react'

const Button = ({name, onClick}) => (
	<button onClick={onClick}>{name}</button>
)

const StatisticLine = ({name, value}) => (
	<tr>
		<td>{name}</td>
		<td>{value}</td>
	</tr>
)

const Statistics = ({good, neutral, bad}) => {
	const all = good + neutral + bad;
	const average = (good * 1 + bad * -1) / all;
	const positivePerc = good / all * 100;

	if (all === 0)
		return (
			<>
				<h1>Statistics</h1>
				<p>No feedback given</p>
			</>
		)

	return (
		<>
			<h1>Statistics</h1>
			<table>
				<StatisticLine name="good" value={good}/>
				<StatisticLine name="neutral" value={neutral}/>
				<StatisticLine name="bad" value={bad}/>
				<StatisticLine name="all" value={all}/>
				<StatisticLine name="average" value={average}/>
				<StatisticLine name="positive" value={positivePerc}/>
			</table>
		</>
	)
}

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const incrementGood = () => setGood(good + 1);
	const incrementNeutral = () => setNeutral(neutral + 1);
	const incrementBad = () => setBad(bad + 1);

	return (
		<div>
			<h1>Give feedback</h1>
			<Button name="good" onClick={incrementGood}/>
			<Button name="neutral" onClick={incrementNeutral}/>
			<Button name="bad" onClick={incrementBad}/>
			<Statistics good={good} bad={bad} neutral={neutral} />
		</div>
	)
}

export default App;
