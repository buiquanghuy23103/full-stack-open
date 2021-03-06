import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, Route, Routes } from 'react-router-dom'
import NotificationMessage from './components/NotificationMessage'
import Home from './pages/Home'
import User from './pages/User'
import Users from './pages/Users'
import { fetchBlogs } from './reducers/blogReducer'
import { userActions } from './reducers/userReducer'
import UserInfo from './components/UserInfo'
import BlogDetail from './pages/BlogDetail'

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
		<div className='container'>
			<div>
				<Link to='/'>blogs  </Link>
				<Link to='/users'>users  </Link>
				<UserInfo />
			</div>
			<h2>blogs</h2>
			<NotificationMessage />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/users' element={<Users />} />
				<Route path='/users/:id' element={<User />} />
				<Route path='/blogs/:id' element={<BlogDetail />}/>
			</Routes>
		</div>
	)
}

export default App
