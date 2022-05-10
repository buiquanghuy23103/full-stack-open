import axios from 'axios'

const baseUrl = 'http://localhost:3001'

const getAll = () => {
	return axios.get(`${baseUrl}/persons`)
			.then(response => response.data)
}

const addNewPerson = newPerson => {
	return axios.post(`${baseUrl}/persons`, newPerson)
		.then(response => response.data)
}

const deletePersonById = id => {
	return axios.delete(`${baseUrl}/persons/${id}`)
		.then(response => response.data)
}

export default {
	getAll,
	addNewPerson,
	deletePersonById
}