import axios from 'axios'

const getAll = async () => {
	const response = await axios.get('/api/blogs')
	return response.data
}

const create = async (token, newBlog) => {
	const config = {
		headers: {
			Authorization: `bearer ${token}`
		}
	}
	const response = await axios.post('/api/blogs', newBlog, config)
	return response.data
}

export default { getAll, create }