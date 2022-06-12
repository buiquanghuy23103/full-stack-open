import { useMutation } from "@apollo/client"
import queries from "../queries"
import useField from "../useField"

const Login = ({ show, handleSuccessLogin }) => {
	const usernameField = useField('username', 'text')
	const passwordField = useField('password', 'password')
	const [login, { data }] = useMutation(queries.LOGIN)

	const handleSubmit = async event => {
		event.preventDefault()
		login({
			variables: {
				username: usernameField.value,
				password: passwordField.value
			}
		}).then(handleSuccessLogin)
	}

	if (!show) return null
	return (
		<>
			<h1>LOGIN</h1>
			<form onSubmit={handleSubmit}>
				<div>
					username
					<input {...usernameField.inputProps}  />
				</div>
				<div>
					password
					<input {...passwordField.inputProps}  />
				</div>
				<button type="submit">login</button>
			</form>
		</>
	)
}

export default Login