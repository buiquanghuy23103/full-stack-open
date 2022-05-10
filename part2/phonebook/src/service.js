import axios from 'axios'

const getAll = () => {
	return axios.get('http://localhost:3001/persons')
			.then(response => response.data)
}

export default {
	getAll
}