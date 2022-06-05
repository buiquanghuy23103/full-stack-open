import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = ({ showDeleteButton, deleteBlog, token }) => {
	const blogs = useSelector(state => state.blogs)
	const sortedList = [...blogs]
	sortedList.sort((a, b) => b.likes - a.likes)
	return sortedList.map((blog) => (
		<Blog
			key={blog.id}
			blog={blog}
			showDeleteButton={showDeleteButton(blog)}
			deleteBlog={() => deleteBlog(blog)}
			token={token}
		/>
	))
}

export default BlogList
