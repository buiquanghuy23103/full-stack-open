import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
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
		fetchBlogs()
			.catch(console.log)
		getCachedUserCredentials()
	}, [])

	const notify = message => {
		setMessage(message)
		setTimeout(() => {
			setMessage('')
		}, 5000);
	}

	const addNewBlog = async newBlog => {
		const response = await blogService.create(user.token, newBlog)
		setBlogs(blogs.concat(response))
		toggableRef.current.toggleVisible()
		notify(`A new blog ${response.title} by ${user.name} added`)
	}

	const login = async credentials => {
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
				<button onClick={logout}>logout</button>
			</>
		)
	}

	const blogList = blogs.map(blog => <Blog key={blog.id} blog={blog} />)

	return (
		<div>
			<h2>blogs</h2>
			<NotificationMessage message={message} />
			{ user && userInfo() }
			{ user &&
				<BlogForm
					addNewBlog={addNewBlog}
					author={user.name}
					ref={toggableRef} /> 
			}
			{ !user && <LoginForm login={login} /> }
			{ blogList }
		</div>
	)
}

export default App
