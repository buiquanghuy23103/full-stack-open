import { useState } from 'react'

const PersonLine = ({person}) => (
	<p key={person.name}>{person.name} {person.number}</p>
)

const Filter = ({persons}) => {
	const [filter, setFilter] = useState('')

	const handleFilterChange = (event) => {
		setFilter(event.target.value)
	}

	const filteredList = persons.filter(person =>
		person.name.toLowerCase().includes(filter.toLowerCase())
	).map(person => <PersonLine key={person.id} person={person}/>)

	return (
		<>
			<p>
				filter shown with
				<input value={filter} onChange={handleFilterChange} />
			</p>
			{filter ? filteredList : ''}
		</>
	)
}

const AddNewForm = ({persons, addNewPerson}) => {
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
			const newPerson = {
				name: newName,
				number: newNumber,
				id: persons.length
			}
			addNewPerson(newPerson)
		}
		setNewName('')
		setNewNumber('')
	}

	return (
		<form>
			<p>
				name: <input value={newName} onChange={handleNameChange}/>
			</p>
			<p>
				number: <input value={newNumber} onChange={handleNumberChange}/>
			</p>
			<button type="submit" onClick={handleSubmit}>add</button>
		</form>
	)
}

const PersonList = ({persons}) => persons.map(person => 
	<PersonLine key={person.id} person={person}/>
)

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456', id: 1 },
		{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
		{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
		{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
	])

	const addNewPerson = (newPerson) => {
		setPersons(persons.concat(newPerson))
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter persons={persons}/>
			<h2>Add a new</h2>
			<AddNewForm persons={persons} addNewPerson={addNewPerson}/>
			<h2>Numbers</h2>
			<PersonList persons={persons}/>
		</div>
	)
}

export default App