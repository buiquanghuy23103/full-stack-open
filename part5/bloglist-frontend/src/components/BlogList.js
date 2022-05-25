import Blog from "./Blog"

const BlogList = ({ blogs, incrementLike, showDeleteButton, deleteBlog }) => {
	const sortedList = [ ...blogs ]
	sortedList.sort((a, b) => b.likes - a.likes)
	return sortedList.map(blog =>
		<Blog
			key={ blog.id }
			blog={ blog }
			incrementLike={ () => incrementLike(blog) }
			showDeleteButton={ showDeleteButton(blog) }
			deleteBlog={ () => deleteBlog(blog) }
		/>)
}

export default BlogList