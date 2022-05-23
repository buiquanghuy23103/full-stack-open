const LoginForm = ({
	username,
	password,
	handleSubmit,
	onUsernameChange,
	onPasswordChange
}) => {
	return (
	<form onSubmit={handleSubmit}>
		<div>
			username
			<input
				type="text"
				value={username}
				name="username"
				onChange={onUsernameChange}
			/>
		</div>
		<div>
			password
			<input
				type="password"
				name="password"
				value={password}
				onChange={onPasswordChange}
			/>
		</div>
		<button type="submit">submit</button>
	</form>
	)
}

export default LoginForm