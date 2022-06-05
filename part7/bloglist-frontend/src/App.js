import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import NotificationMessage from './components/NotificationMessage'
import { fetchBlogs, incrementLike } from './reducers/blogReducer'
import { notify } from './reducers/notificationReducer'
import loginService from './services/login'

const App = () => {
	const dispatch = useDispatch()
	const [user, setUser] = useState(null)

	const getCachedUserCredentials = () => {
		const credentials = window.localStorage.getItem('user')
		setUser(JSON.parse(credentials))
	}

	const like = (blog) => {
		try {
			dispatch(incrementLike(user.token, blog))
		} catch (error) {
			dispatch(notify(error.toString()))
		}
	}

	useEffect(() => {
		dispatch(fetchBlogs())
		getCachedUserCredentials()
	}, [])

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

	const showDeleteButton = (blog) =>
		user && user.username === blog.author.username

	return (
		<div>
			<h2>blogs</h2>
			<NotificationMessage />
			{user && userInfo()}
			{user && (
				<BlogForm author={user.name} token={user.token} />
			)}
			{!user && <LoginForm login={login} />}
			<BlogList
				incrementLike={like}
				showDeleteButton={showDeleteButton}
				token={user ? user.token : null}
			/>
		</div>
	)
}

export default App
