import axios from 'axios'

const getAll = async () => {
	const response = await axios.get('/api/blogs')
	return response.data
}

export default { getAll }