import axios from 'axios'

const baseUrl = 'https://immense-reaches-73057.herokuapp.com/api'

const getAll = () => {
	return axios.get(`${baseUrl}/persons`)
			.then(response => response.data)
}

const addNewPerson = newPerson => {
	return axios.post(`${baseUrl}/persons`, newPerson)
		.then(response => response.data)
}

const deletePerson = person => {
	return axios.delete(`${baseUrl}/persons/${person.id}`)
		.then(response => response.data)
}

const updatePerson = person => {
	return axios.put(`${baseUrl}/persons/${person.id}`, person)
		.then(response => response.data)
}

export default {
	getAll,
	addNewPerson,
	deletePerson,
	updatePerson
}