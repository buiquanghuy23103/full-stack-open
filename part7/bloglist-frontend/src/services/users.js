import axios from 'axios'

const getAll = async () => {
	const response = await axios.get('/api/users')
	return response.data
}

const userService = {
	getAll
}

export default userService