import { useState } from "react"
import blogs from "../services/blogs"

const LoginForm = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = async (event) => {
		try {
			event.preventDefault()
			const response = await blogs.login({ username, password })
			console.log(response)
		} catch (error) {
			console.error(error)
		}
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