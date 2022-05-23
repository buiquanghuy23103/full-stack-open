import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [token, setToken] = useState('')

	const fetchBlogs = async () => {
		const blogs = await blogService.getAll()
		setBlogs(blogs)
	}

	const getCachedToken = () => {
		const cachedToken = window.localStorage.getItem('token')
		setToken(cachedToken)
	}

	useEffect(() => {
		fetchBlogs()
			.catch(console.log)
		getCachedToken()
	}, [])

	return (
		<div>
		<h2>blogs</h2>
		{ !token && <LoginForm />}
		{blogs.map(blog =>
			<Blog key={blog.id} blog={blog} />
		)}
		</div>
	)
}

export default App
