import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import NotificationMessage from './components/NotificationMessage'
import { blogActions, createBlog, fetchBlogs, incrementLike } from './reducers/blogReducer'
import { notify } from './reducers/notificationReducer'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const dispatch = useDispatch()
	const [user, setUser] = useState(null)
	const toggableRef = useRef(null)

	const getCachedUserCredentials = () => {
		const credentials = window.localStorage.getItem('user')
		setUser(JSON.parse(credentials))
	}

	const like = (blog) => {
		dispatch(incrementLike(user.token, blog))
	}

	useEffect(() => {
		dispatch(fetchBlogs())
		getCachedUserCredentials()
	}, [])

	const addNewBlog = async (newBlog) => {
		dispatch(createBlog(user.token, newBlog))
		toggableRef.current.toggleVisible()
		dispatch(notify(`A new blog ${newBlog.title} by ${user.name} added`))
	}

	const login = async (credentials) => {
		try {
			const response = await loginService.login(credentials)
			setUser(response)
			window.localStorage.setItem('user', JSON.stringify(response))
		} catch (error) {
			console.log(error)
			dispatch(notify('Wrong username or password'))
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
			dispatch(blogActions.deleteBlogById(blog.id))
		} catch (error) {
			console.log(error)
		}
	}

	const showDeleteButton = (blog) =>
		user && user.username === blog.author.username

	return (
		<div>
			<h2>blogs</h2>
			<NotificationMessage />
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
				incrementLike={like}
				showDeleteButton={showDeleteButton}
				deleteBlog={deleteBlog}
			/>
		</div>
	)
}

export default App
