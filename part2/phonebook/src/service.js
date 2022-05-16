import axios from 'axios'

const getAll = () => {
	return axios.get('/persons')
			.then(response => response.data)
}

const addNewPerson = newPerson => {
	return axios.post('/persons', newPerson)
		.then(response => response.data)
}

const deletePerson = person => {
	return axios.delete(`/persons/${person.id}`)
		.then(response => response.data)
}

const updatePerson = person => {
	return axios.put(`/persons/${person.id}`, person)
		.then(response => response.data)
}

export default {
	getAll,
	addNewPerson,
	deletePerson,
	updatePerson
}