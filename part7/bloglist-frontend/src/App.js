import { useState, useEffect, useRef } from 'react'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import NotificationMessage from './components/NotificationMessage'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)
	const [message, setMessage] = useState('')
	const toggableRef = useRef(null)

	const fetchBlogs = async () => {
		const blogs = await blogService.getAll()
		setBlogs(blogs)
	}

	const getCachedUserCredentials = () => {
		const credentials = window.localStorage.getItem('user')
		setUser(JSON.parse(credentials))
	}

	useEffect(() => {
		fetchBlogs().catch(console.log)
		getCachedUserCredentials()
	}, [])

	const notify = (message) => {
		setMessage(message)
		setTimeout(() => {
			setMessage('')
		}, 5000)
	}

	const addNewBlog = async (newBlog) => {
		const response = await blogService.create(user.token, newBlog)
		setBlogs(blogs.concat(response))
		toggableRef.current.toggleVisible()
		notify(`A new blog ${response.title} by ${user.name} added`)
	}

	const incrementLike = async (blog) => {
		try {
			const { token } = user
			const updatedBlog = { ...blog, likes: blog.likes + 1 }
			const response = await blogService.update(token, updatedBlog)
			console.log(response)
			setBlogs(blogs.map((b) => (b.id === response.id ? response : b)))
		} catch (error) {
			notify(error.response.data.error)
		}
	}

	const login = async (credentials) => {
		try {
			const response = await loginService.login(credentials)
			setUser(response)
			window.localStorage.setItem('user', JSON.stringify(response))
		} catch (error) {
			console.log(error)
			notify('Wrong username or password')
		}
	}

	const userInfo = () => {
		const logout = () => {
			setUser(null)
			window.localStorage.removeItem('user')
		}
		return (
			<>
				<p>{user.name} logged in</p>
				<button id="logout-button" onClick={logout}>
					logout
				</button>
			</>
		)
	}

	const deleteBlog = async (blog) => {
		try {
			if (!window.confirm(`Remove blog ${blog.title} by ${blog.author.name}`))
				return
			await blogService.deleteBlog(user.token, blog)
			setBlogs(blogs.filter((b) => b.id !== blog.id))
		} catch (error) {
			console.log(error)
		}
	}

	console.log('user', user)

	const showDeleteButton = (blog) =>
		user && user.username === blog.author.username

	return (
		<div>
			<h2>blogs</h2>
			<NotificationMessage message={message} />
			{user && userInfo()}
			{user && (
				<BlogForm
					addNewBlog={addNewBlog}
					author={user.name}
					ref={toggableRef}
				/>
			)}
			{!user && <LoginForm login={login} />}
			<BlogList
				blogs={blogs}
				incrementLike={incrementLike}
				showDeleteButton={showDeleteButton}
				deleteBlog={deleteBlog}
			/>
		</div>
	)
}

export default App
