import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteBlogById } from '../reducers/blogReducer'

const Blog = ({ blog, incrementLike, showDeleteButton, token }) => {
	const dispatch = useDispatch()
	const [showDetails, setShowDetails] = useState(false)

	const toggleDetailsView = () => setShowDetails(!showDetails)

	const deleteBlog = () => {
		try {
			if (!window.confirm(`Remove blog ${blog.title} by ${blog.author.name}`))
				return
			dispatch(deleteBlogById(token, blog.id))
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
					<button id="blog-like-button" onClick={incrementLike}>
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
