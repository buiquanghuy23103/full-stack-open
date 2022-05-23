import { useState } from "react"
import blogs from "../services/blogs"

const LoginForm = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [errorMessage, setErrorMessage] = useState('')

	const handleSubmit = async (event) => {
		try {
			event.preventDefault()
			const response = await blogs.login({ username, password })
			console.log(response)
		} catch (error) {
			console.error(error)
			setErrorMessage('Wrong credentials')
			setTimeout(() => {
				setErrorMessage('')
			}, 5000);
		} finally {
			setUsername('')
			setPassword('')
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
		{ errorMessage && (<p>{errorMessage}</p>) }
		<button type="submit">submit</button>
	</form>
}

export default LoginForm