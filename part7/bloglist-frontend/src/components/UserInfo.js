import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '../reducers/userReducer'

const UserInfo = () => {
	const dispatch = useDispatch()
	const user = useSelector(state => state.user)
	if (!user) return null
	const { name } = user
	const logout = () => {
		dispatch(userActions.removeUser())
		window.localStorage.removeItem('user')
	}
	return (
		<div style={{ display: 'inline-block' }}>
			{name} logged in
			<button id="logout-button" onClick={logout}>
				logout
			</button>
		</div>
	)
}

export default UserInfo