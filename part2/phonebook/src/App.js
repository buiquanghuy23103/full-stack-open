import { useState } from 'react'

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456', id: 1 },
		{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
		{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
		{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
	])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filter, setFilter] = useState('')

	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value)
	}

	const handleFilterChange = (event) => {
		setFilter(event.target.value)
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

	const personList = persons.map(person => 
		<p key={person.name}>{person.name} {person.number}</p>
	)

	const filteredList = persons.filter(person =>
		person.name.toLowerCase().includes(filter.toLowerCase())
	).map(person => <p>{person.name}</p>)

	return (
		<div>
		<h2>Phonebook</h2>
		<p>
			filter shown with
			<input value={filter} onChange={handleFilterChange} />
		</p>
		<p>{filteredList}</p>
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
			{personList}
		</div>
	)
}

export default App