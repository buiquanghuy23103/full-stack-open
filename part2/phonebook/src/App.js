import { useState, useEffect } from 'react'
import service from './service'
import Filter from './components/Filter'
import PersonList from './components/PersonList'
import AddNewForm from './components/AddNewForm'
import Notification from './components/Notification'

const App = () => {
	const [persons, setPersons] = useState([])
	const [message, setMessage] = useState(null)

	useEffect(() => {
		service.getAll()
			.then(data => setPersons(data))
	}, [])

	const addNewPerson = (newPerson) => {
		service.addNewPerson(newPerson)
			.then(newPerson => {
				setPersons(persons.concat(newPerson))
				setMessage({
					type: 'success',
					content: `Added ${newPerson.name}`
				})
				setTimeout(() => {
					setMessage(null)
				}, 2000);
			})
			.catch(error => {
				console.log(error)
				setMessage({
					type: 'error',
					content: error.response.data.error
				})
				setTimeout(() => {
					setMessage(null)
				}, 2000);
			})
	}

	const updatePerson = (person) => {
		service.updatePerson(person)
			.then(updatedPerson => {
				setPersons(persons.map(p =>
					p.id === person.id ? updatedPerson : p
				))
			})
			.catch(error => {
				console.log(error)
				setMessage({
					type: 'error',
					content: error.response.data.error
				})
				setTimeout(() => {
					setMessage(null)
				}, 2000);
			})
	}

	const deletePerson = person => {
		if (window.confirm(`Delete ${person.name}`))
		{
			service.deletePerson(person)
				.then(_ => setPersons(persons.filter(p => p.id !== person.id)))
				.catch(error => {
					const message = { type: 'error', content: 'Error'}
					if (error.code === 'ERR_BAD_REQUEST')
					{
						message.content = `Information of ${person.name} has`
						+ ` already been removed from server`
						setMessage(message)
						setTimeout(() => {
							setMessage(null)
						}, 2000);
					}
				})
		}
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter persons={persons}/>
			<h2>Add a new</h2>
			<Notification message={message}/>
			<AddNewForm
				persons={persons}
				addNewPerson={addNewPerson}
				updatePerson={updatePerson}/>
			<h2>Numbers</h2>
			<PersonList
				persons={persons}
				deletePerson={deletePerson}/>
		</div>
	)
}

export default App