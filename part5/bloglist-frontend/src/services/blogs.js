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

const update = async (token, updatedBlog) => {
	const config = {
		headers: {
			Authorization: `bearer ${token}`
		}
	}
	// blog.author produces type error in NodeJS
	delete updatedBlog.author
	const response = await axios.put(
		`/api/blogs/${updatedBlog.id}`,
		updatedBlog,
		config
	)
	return response.data
}

const deleteBlog = async (token, deleteBlog) => {
	const config = {
		headers: {
			Authorization: `bearer ${token}`
		}
	}
	const response = await axios.delete(`/api/blogs/${deleteBlog.id}`, config)
	return response.data
}

export default { getAll, create, update, deleteBlog }