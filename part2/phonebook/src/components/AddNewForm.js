import { useState } from "react"

const AddNewForm = ({persons, addNewPerson, updatePerson}) => {
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
		const foundPerson = persons.find(person => person.name === newName)
		if (foundPerson && window.confirm(`${newName} is already added to the phonebook`
				+ ", replace the old number with a new one?"))
		{
			const newPerson = { ...foundPerson, number: newNumber }
			updatePerson(newPerson)
		}
		if (!foundPerson)
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