import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = ({ incrementLike, showDeleteButton, deleteBlog }) => {
	const blogs = useSelector(state => {
		console.log(state)
		return state.blogs
	})
	const sortedList = [...blogs]
	sortedList.sort((a, b) => b.likes - a.likes)
	return sortedList.map((blog) => (
		<Blog
			key={blog.id}
			blog={blog}
			incrementLike={() => incrementLike(blog)}
			showDeleteButton={showDeleteButton(blog)}
			deleteBlog={() => deleteBlog(blog)}
		/>
	))
}

export default BlogList
