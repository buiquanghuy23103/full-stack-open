import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlogById, incrementLike } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'

const Blog = ({ blog }) => {
	const dispatch = useDispatch()
	const user = useSelector(state => state.user)
	const [showDetails, setShowDetails] = useState(false)

	const toggleDetailsView = () => setShowDetails(!showDetails)

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
		} catch (error) {
			console.log(error)
		}
	}

	const displaySettings = {
		display: showDetails ? '' : 'none',
	}

	const deleteButtonStyle = {
		display: showDeleteButton ? '' : 'none',
	}

	return (
		<div className="blog">
			{blog.title} by {blog.author.name}
			<button id="blog-view-button" onClick={toggleDetailsView}>
				{showDetails ? 'hide' : 'view'}
			</button>
			<div style={displaySettings}>
				<p>Url: {blog.url}</p>
				<div>
					Likes: {blog.likes}
					<button id="blog-like-button" onClick={like}>
						like
					</button>
				</div>
				<button
					id="blog-delete-button"
					onClick={deleteBlog}
					style={deleteButtonStyle}
				>
					remove
				</button>
			</div>
		</div>
	)
}

export default Blog
