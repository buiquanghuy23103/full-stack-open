import { useSelector } from 'react-redux'
import lodash from 'lodash'

const UserBlogCounts = () => {
	const counts = useSelector(state => {
		const blogs = state.blogs
		const statistic = lodash.countBy(blogs, 'author.name')
		return Object.entries(statistic)
	})
	return (
		<>
			{counts.map(([author, blogCount]) =>
				<p key={author}>{author}: {blogCount} </p>)}
		</>
	)
}

export default UserBlogCounts