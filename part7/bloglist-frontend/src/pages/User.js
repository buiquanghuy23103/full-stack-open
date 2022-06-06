import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import userService from '../services/users'

const User = () => {
	const [user, setUser] = useState(null)
	const blogs = useSelector(state => state.blogs)
	const params = useParams()
	const id = params.id

	useEffect(() => {
		userService.getAll()
			.then(users => users.find(u => u.id === id))
			.then(setUser)
			.catch(console.log)
	}, [])

	if (!user) return null

	const addedBlogs = blogs.filter(blog => blog.author.id === user.id)

	return (
		<>
			<h2>{user.name}</h2>
			<h3>Added blogs</h3>
			<ul>
				{addedBlogs.map(blog => (
					<li key={blog.id}>
						{blog.title}
					</li>)
				)}
			</ul>
		</>
	)
}

export default User