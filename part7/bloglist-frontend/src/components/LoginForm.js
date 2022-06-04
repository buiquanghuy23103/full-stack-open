import { useState } from 'react'
import Toggable from './Toggable'
import PropTypes from 'prop-types'

const LoginForm = ({
	login
}) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = e => {
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
						id='username'
						type="text"
						value={username}
						name="username"
						onChange={e => setUsername(e.target.value)}
					/>
				</div>
				<div>
					password
					<input
						id='password'
						type="password"
						name="password"
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
				</div>
				<button id='login-button' type="submit">submit</button>
			</form>
		</Toggable>
	)
}

LoginForm.propTypes = {
	login: PropTypes.func.isRequired
}

export default LoginForm