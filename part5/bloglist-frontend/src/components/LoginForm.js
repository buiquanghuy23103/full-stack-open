import { useState } from "react"

const LoginForm = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = (event) => {
		event.preventDefault()
		console.log('username: ', username)
		console.log('password: ', password)
	}

	return <form onSubmit={handleSubmit}>
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
}

export default LoginForm