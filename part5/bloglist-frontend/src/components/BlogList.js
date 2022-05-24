import Blog from "./Blog"

const BlogList = ({ blogs, incrementLike }) => {
	const sortedList = [ ...blogs ]
	sortedList.sort((a, b) => b.likes - a.likes)
	console.log('sorted blogs', sortedList)
	return sortedList.map(blog =>
		<Blog
			key={blog.id}
			blog={blog}
			incrementLike={() => incrementLike(blog)}
		/>)
}

export default BlogList