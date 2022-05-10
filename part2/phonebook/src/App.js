import { useState, useEffect } from 'react'
import service from './service'
import Filter from './components/Filter'
import PersonList from './components/PersonList'
import AddNewForm from './components/AddNewForm'

const App = () => {
	const [persons, setPersons] = useState([])

	useEffect(() => {
		service.getAll()
			.then(data => setPersons(data))
	}, [])
	

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