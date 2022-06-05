import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import NotificationMessage from './components/NotificationMessage'
import UserInfo from './components/UserInfo'
import { fetchBlogs } from './reducers/blogReducer'
import { userActions } from './reducers/userReducer'

const App = () => {
	const dispatch = useDispatch()
	const user = useSelector(state => state.user)

	const getCachedUserCredentials = () => {
		const credentials = window.localStorage.getItem('user')
		dispatch(userActions.setUser(JSON.parse(credentials)))
	}

	useEffect(() => {
		dispatch(fetchBlogs())
		getCachedUserCredentials()
	}, [])

	const showDeleteButton = (blog) =>
		user && user.username === blog.author.username

	return (
		<div>
			<h2>blogs</h2>
			<NotificationMessage />
			<UserInfo />
			<BlogForm  />
			<LoginForm />
			<BlogList
				showDeleteButton={showDeleteButton}
				token={user ? user.token : null}
			/>
		</div>
	)
}

export default App
