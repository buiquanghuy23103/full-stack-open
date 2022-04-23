import { useState } from 'react'

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '041235678' }
	])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')

	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value)
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		if (persons.find(person => person.name === newName))
			window.alert(`${newName} is already added to phonebook`)
		else
		{
			const newPerson = { name: newName, number: newNumber }
			setPersons(persons.concat(newPerson))
		}
		setNewName('')
		setNewNumber('')
	}

	const personList = () => {
		return (
			persons.map(person => 
				<p key={person.name}>{person.name} {person.number}</p>
			)
		)
	}

	return (
		<div>
		<h2>Phonebook</h2>
		<form>
			<p>
				name: <input value={newName} onChange={handleNameChange}/>
			</p>
			<p>
				number: <input value={newNumber} onChange={handleNumberChange}/>
			</p>
			<button type="submit" onClick={handleSubmit}>add</button>
		</form>
		<h2>Numbers</h2>
			{personList()}
		</div>
	)
}

export default App