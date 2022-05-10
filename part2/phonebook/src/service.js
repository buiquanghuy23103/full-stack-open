import axios from 'axios'

const getAll = () => {
	return axios.get('http://localhost:3001/persons')
			.then(response => response.data)
}

const addNewPerson = newPerson => {
	return axios.post('http://localhost:3001/persons', newPerson)
		.then(response => response.data)
}

export default {
	getAll,
	addNewPerson
}