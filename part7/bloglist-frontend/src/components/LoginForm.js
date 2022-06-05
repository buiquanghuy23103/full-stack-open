import { useState } from 'react'
import Toggable from './Toggable'
import loginService from '../services/login'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '../reducers/userReducer'
import { notify } from '../reducers/notificationReducer'

const LoginForm = () => {
	const dispatch = useDispatch()
	const user = useSelector(state => state.user)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	if (user) return null

	const login = async (credentials) => {
		try {
			const response = await loginService.login(credentials)
			dispatch(userActions.setUser(response))
			window.localStorage.setItem('user', JSON.stringify(response))
		} catch (error) {
			console.log(error)
			dispatch(notify('Wrong username or password'))
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		setUsername('')
		setPassword('')
		login({ username, password })
	}

	return (
		<Toggable openButtonLabel="login" closeButtonLabel="cancel">
			<form onSubmit={handleSubmit}>
				<div>
					username
					<input
						id="username"
						type="text"
						value={username}
						name="username"
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div>
					password
					<input
						id="password"
						type="password"
						name="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<button id="login-button" type="submit">
					submit
				</button>
			</form>
		</Toggable>
	)
}

export default LoginForm
