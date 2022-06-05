import userService from '../services/users'
import { useEffect, useState } from 'react'

const UserBlogCounts = () => {
	const [users, setUsers] = useState([])

	useEffect(() => {
		userService.getAll()
			.then(setUsers)
			.catch(console.log)
	}, [])

	if (!users || users.length === 0)
		return null

	const counts = users.map(user => (
		<tr key={user.id}>
			<td>{user.name}</td>
			<td>{user.blogs.length}</td>
		</tr>
	))
	return (
		<table>
			<thead>
				<tr>
					<th>Author</th>
					<th>Blog counts</th>
				</tr>
			</thead>
			<tbody>
				{ counts }
			</tbody>
		</table>
	)
}

export default UserBlogCounts