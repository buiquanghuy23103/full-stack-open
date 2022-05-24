import { useState } from "react"
import Toggable from "./Toggable"

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
		<Toggable buttonLabel="login">
			<form onSubmit={handleSubmit}>
				<div>
					username
					<input
						type="text"
						value={username}
						name="username"
						onChange={e => setUsername(e.target.value)}
					/>
				</div>
				<div>
					password
					<input
						type="password"
						name="password"
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
				</div>
				<button type="submit">submit</button>
			</form>
		</Toggable>
	)
}

export default LoginForm