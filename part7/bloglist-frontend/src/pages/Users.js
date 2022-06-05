import { useSelector } from 'react-redux'
import lodash from 'lodash'

const Users = () => {
	const counts = useSelector(state => {
		const blogs = state.blogs
		const statistic = lodash.countBy(blogs, 'author.name')
		return Object.entries(statistic)
	})
	console.log(counts)
	return (
		<>
			<h2>Users</h2>
			{counts.map(([author, blogCount]) =>
				<p key={author}>{author}: {blogCount} </p>)}
		</>
	)
}

export default Users