import { useState } from "react"

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
				id: Math.random()
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

export default AddNewForm