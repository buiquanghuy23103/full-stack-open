import axios from 'axios'

const getAll = async () => {
	const response = await axios.get('/api/blogs')
	return response.data
}

const login = async credentials => {
	const response = await axios.post('/api/login', credentials)
	return response.data
}

export default { getAll, login }