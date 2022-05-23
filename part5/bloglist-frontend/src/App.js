import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'

const App = () => {
	const [blogs, setBlogs] = useState([])

	const fetchBlogs = async () => {
		const blogs = await blogService.getAll()
		setBlogs(blogs)
	}

	useEffect(() => {
		fetchBlogs()
			.catch(console.log)
	}, [])

	return (
		<div>
		<h2>blogs</h2>
		<LoginForm />
		{blogs.map(blog =>
			<Blog key={blog.id} blog={blog} />
		)}
		</div>
	)
}

export default App
