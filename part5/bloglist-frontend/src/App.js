import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import NotificationMessage from './components/NotificationMessage'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [message, setMessage] = useState('')
	const [newBlog, setNewBlog] = useState({ title: '', url: '' })

	const fetchBlogs = async () => {
		const blogs = await blogService.getAll()
		setBlogs(blogs)
	}

	const getCachedUserCredentials = () => {
		const credentials = window.localStorage.getItem('user')
		setUser(JSON.parse(credentials))
	}

	useEffect(() => {
		fetchBlogs()
			.catch(console.log)
		getCachedUserCredentials()
	}, [])

	const loginForm = () => {
		const handleSubmit = async (event) => {
			try {
				event.preventDefault()
				const response = await loginService.login({ username, password })
				setUser(response)
				window.localStorage.setItem('user', JSON.stringify(response))
				setUsername('')
				setPassword('')
			} catch (error) {
				console.error(error)
				setMessage('Wrong credentials')
				setTimeout(() => {
					setMessage('')
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
			<button type="submit">submit</button>
		</form>
	}

	const blogForm = () => {
		const submitForm = async (event) => {
			event.preventDefault()
			const response = await blogService.create(user.token, newBlog)
			setNewBlog({ title: '', url: '' })
			setBlogs(blogs.concat(response))
			setMessage(`A new blog ${response.title} by ${user.name} added`)
			setTimeout(() => {
				setMessage('')
			}, 5000);
		}
		const { title, url } = newBlog
		return (
			<form onSubmit={submitForm}>
				<div>
					title
					<input
						value={title}
						onChange={({ target }) =>
						setNewBlog({...newBlog, title: target.value})
					}
					/>
				</div>
				<div>
					url
					<input
						value={url}
						onChange={({ target }) =>
							setNewBlog({...newBlog, url: target.value})
						}
					/>
				</div>
				<button type="submit">save</button>
			</form>
		)
	}

	const userInfo = () => {
		const logout = () => {
			setUser(null)
			window.localStorage.removeItem('user')
		}
		return (
			<>
			<p>{user.name} logged in</p>
			<button onClick={logout}>logout</button>
			</>
		)
	}

	return (
		<div>
			<h2>blogs</h2>
			<NotificationMessage message={message} />
			{ user && userInfo() }
			{ user ? blogForm() : loginForm() }
			{blogs.map(blog =>
				<Blog key={blog.id} blog={blog} />
			)}
		</div>
	)
}

export default App
