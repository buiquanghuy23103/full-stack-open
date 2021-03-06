const Header = ({courseName}) => (
	<>
	<h1>{courseName}</h1>
	</>
)

const Part = ({part}) => (
	<p>
		{part.name} {part.exercises}
	</p>
)

const Content = ({parts}) => parts.map(part => <Part part={part} />)

const Total = ({parts}) => {
	const total = parts.map(part => part.exercises)
					.reduce((prev, curr) => prev + curr)
	return (
	<>
		<p>Number of exercises {total}</p>
	</>
	)
}

const App = () => {
	const course = {
		name: 'Half Stack application development',
		parts: [
			{
			name: 'Fundamentals of React',
			exercises: 10
			},
			{
			name: 'Using props to pass data',
			exercises: 7
			},
			{
			name: 'State of a component',
			exercises: 14
			}
		]
	}

	return (
		<div>
			<Header courseName={course.name}/>
			<Content parts={course.parts}/>
			<Total parts={course.parts} />
		</div>
	)
}

export default App;
