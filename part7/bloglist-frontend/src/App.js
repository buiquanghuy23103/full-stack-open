import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import NotificationMessage from './components/NotificationMessage'
import Home from './pages/Home'
import Users from './pages/Users'
import { fetchBlogs } from './reducers/blogReducer'
import { userActions } from './reducers/userReducer'

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
			<NotificationMessage />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/users' element={<Users/>} />
			</Routes>
		</div>
	)
}

export default App
