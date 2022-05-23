import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [errorMessage, setErrorMessage] = useState('')

	const fetchBlogs = async () => {
		const blogs = await blogService.getAll()
		setBlogs(blogs)
	}

	useEffect(() => {
		fetchBlogs()
			.catch(console.log)
	}, [])

	const loginForm = () => {
		const handleSubmit = async (event) => {
			try {
				event.preventDefault()
				const response = await loginService.login({ username, password })
				setUser(response)
				window.localStorage.setItem('token', response.token)
				setUsername('')
				setPassword('')
			} catch (error) {
				console.error(error)
				setErrorMessage('Wrong credentials')
				setTimeout(() => {
					setErrorMessage('')
				}, 5000);
			}
		}
	
		return <form onSubmit={handleSubmit}>
			<div>
				username
				<input
					type="text"
					value={username}
					name="username"
					onChange={e => setUsername(e.target.value)}
				/>
			</div>
			<div>
				password
				<input
					type="password"
					name="password"
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
			</div>
			{ errorMessage && (<p>{errorMessage}</p>) }
			<button type="submit">submit</button>
		</form>
	}

	return (
		<div>
		<h2>blogs</h2>
		{ !user && loginForm() }
		{blogs.map(blog =>
			<Blog key={blog.id} blog={blog} />
		)}
		</div>
	)
}

export default App
