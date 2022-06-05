import { useSelector } from 'react-redux'
import lodash from 'lodash'

const UserBlogCounts = () => {
	const counts = useSelector(state => {
		const blogs = state.blogs
		const statistic = lodash.countBy(blogs, 'author.name')
		return Object.entries(statistic)
	})
	return (
		<table>
			<thead>
				<tr>
					<th>Author</th>
					<th>Blog counts</th>
				</tr>
			</thead>
			<tbody>
				{counts.map(([author, blogCount]) =>
					<tr key={author}>
						<td>{author}</td>
						<td>{blogCount}</td>
					</tr>
				)}
			</tbody>
		</table>
	)
}

export default UserBlogCounts