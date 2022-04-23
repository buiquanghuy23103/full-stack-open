import { useState } from 'react'

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas' }
	])
	const [newName, setNewName] = useState('')

	const handleInputChange = (event) => {
		setNewName(event.target.value)
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		if (persons.find(person => person.name === newName))
			window.alert(`${newName} is already added to phonebook`)
		else
			setPersons(persons.concat({name: newName}))
	}

	const personList = () => {
		return (
			persons.map(person => 
				<p key={person.name}>{person.name}</p>
			)
		)
	}

	return (
		<div>
		<h2>Phonebook</h2>
		<form>
			<div>
			name: <input onChange={handleInputChange}/>
			</div>
			<div>
			<button type="submit" onClick={handleSubmit}>add</button>
			</div>
		</form>
		<h2>Numbers</h2>
			{personList()}
		</div>
	)
}

export default App