import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import NotificationMessage from './components/NotificationMessage'
import Home from './pages/Home'
import User from './pages/User'
import Users from './pages/Users'
import { fetchBlogs } from './reducers/blogReducer'
import { userActions } from './reducers/userReducer'
import UserInfo from './components/UserInfo'

const App = () => {
	const dispatch = useDispatch()

	const getCachedUserCredentials = () => {
		const credentials = window.localStorage.getItem('user')
		dispatch(userActions.setUser(JSON.parse(credentials)))
	}

	useEffect(() => {
		dispatch(fetchBlogs())
		getCachedUserCredentials()
	}, [])

	return (
		<div>
			<h2>blogs</h2>
			<UserInfo />
			<NotificationMessage />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/users' element={<Users />} />
				<Route path='/users/:id' element={<User/>} />
			</Routes>
		</div>
	)
}

export default App
