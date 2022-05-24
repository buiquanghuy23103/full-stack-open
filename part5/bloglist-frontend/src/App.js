import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import NotificationMessage from './components/NotificationMessage'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [message, setMessage] = useState('')
	const [title, setTitle] = useState('')
	const [url, setUrl] = useState('')
	const [loginVisible, setLoginVisible] = useState(false)

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

	const toggleLoginVisible = () => {
		setLoginVisible(!loginVisible)
	}

	const loginFormController = () => {
		if (user)
			return null
		return (
			<button onClick={ toggleLoginVisible }>
				{loginVisible ? 'cancel' : 'login'}
			</button>
		)
	}

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
	
		return <LoginForm
			handleSubmit={handleSubmit}
			username={username}
			password={password}
			onPasswordChange={e => setPassword(e.target.value)}
			onUsernameChange={e => setUsername(e.target.value)}
			/>
	}

	const blogForm = () => {
		const handleSubmit = async (event) => {
			event.preventDefault()
			const response = await blogService.create(user.token, { title, url })
			setTitle('')
			setUrl('')
			setBlogs(blogs.concat(response))
			setMessage(`A new blog ${response.title} by ${user.name} added`)
			setTimeout(() => {
				setMessage('')
			}, 5000);
		}
		return <BlogForm
			handleSubmit={handleSubmit}
			title={title}
			url={url}
			onTitleChange={e => setTitle(e.target.value)}
			onUrlChange={e => setUrl(e.target.value)}
		/>
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

	const blogList = blogs.map(blog => <Blog key={blog.id} blog={blog} />)

	return (
		<div>
			<h2>blogs</h2>
			<NotificationMessage message={message} />
			{ user && userInfo() && blogForm()}
			{ !user && loginVisible && loginForm() }
			{ loginFormController() }
			{ blogList }
		</div>
	)
}

export default App
