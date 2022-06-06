import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import useField from '../hooks/useField'
import { deleteBlogById, incrementLike } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'
import blogService from '../services/blogs'

const BlogDetail = () => {
	const params = useParams()
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const comment = useField('comment', 'text')
	const blogs = useSelector(state => state.blogs)
	const user = useSelector(state => state.user)
	const blogId = params.id

	if (!blogs) return null
	const blog = blogs.find(b => b.id === blogId)
	if (!blog) return null

	const showDeleteButton = user && user.username === blog.author.username

	const like = () => {
		if (!user)
			dispatch(notify('Please login to like a post'))
		try {
			dispatch(incrementLike(user.token, blog))
		} catch (error) {
			dispatch(notify(error.toString()))
		}
	}

	const deleteBlog = () => {
		try {
			if (!window.confirm(`Remove blog ${blog.title} by ${blog.author.name}`))
				return
			dispatch(deleteBlogById(user.token, blog.id))
			navigate('/')
		} catch (error) {
			console.log(error)
		}
	}

	const addComment = event => {
		event.preventDefault()
		blogService.addComment(blog.id, comment.value)
	}

	const deleteButtonStyle = {
		display: showDeleteButton ? '' : 'none',
	}

	return (
		<div>
			<h2>{blog.title} by { blog.author.name }</h2>
			<p>Url: {blog.url}</p>
			<div>
				Likes: {blog.likes}
				<button id="blog-like-button" onClick={like}>
					like
				</button>
			</div>
			<form onSubmit={addComment}>
				comment:
				<input { ...comment.inputProps } />
				<button type='submit'>submit</button>
			</form>
			<ul>
				{blog.comments.map((comment, index) => (
					<li key={`${comment}-${index}`}>
						{ comment }
					</li>
				)) }
			</ul>
			<button
				id="blog-delete-button"
				onClick={deleteBlog}
				style={deleteButtonStyle}
			>
				remove
			</button>
		</div>
	)
}

export default BlogDetail