import useField from "../useField"

const Login = ({ show }) => {
	const usernameField = useField('username', 'text')
	const passwordField = useField('password', 'password')

	const login = event => {
		event.preventDefault()
	}

	if (!show) return null
	return (
		<>
			<h1>LOGIN</h1>
			<form onSubmit={login}>
				<div>
					username
					<input {...usernameField.inputProps}  />
				</div>
				<div>
					password
					<input {...passwordField.inputProps}  />
				</div>
			</form>
		</>
	)
}

export default Login