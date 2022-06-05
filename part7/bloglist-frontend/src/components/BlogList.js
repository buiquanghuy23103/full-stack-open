import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = () => {
	const blogs = useSelector(state => state.blogs)
	const sortedList = [...blogs]
	sortedList.sort((a, b) => b.likes - a.likes)
	return sortedList.map((blog) => (
		<Blog
			key={blog.id}
			blog={blog}
		/>
	))
}

export default BlogList
