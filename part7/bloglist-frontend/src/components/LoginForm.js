import Toggable from './Toggable'
import loginService from '../services/login'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '../reducers/userReducer'
import { notify } from '../reducers/notificationReducer'
import useField from '../hooks/useField'

const LoginForm = () => {
	const dispatch = useDispatch()
	const user = useSelector(state => state.user)
	const username = useField('username', 'text')
	const password = useField('password', 'password')

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
		username.reset()
		password.reset()
		login({ username: username.value, password: password.value })
	}

	return (
		<Toggable openButtonLabel="login" closeButtonLabel="cancel">
			<form onSubmit={handleSubmit}>
				<div>
					username
					<input
						id="username"
						{ ...username.inputProps }
					/>
				</div>
				<div>
					password
					<input
						id="password"
						{ ...password.inputProps }
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
