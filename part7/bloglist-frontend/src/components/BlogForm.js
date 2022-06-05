import { useRef, useState } from 'react'
import Toggable from './Toggable'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'

const BlogForm = ({ author, token }) => {
	const dispatch = useDispatch()
	const [title, setTitle] = useState('')
	const [url, setUrl] = useState('')
	const toggableRef = useRef(null)

	const addNewBlog = async (newBlog) => {
		dispatch(createBlog(token, newBlog))
		toggableRef.current.toggleVisible()
		dispatch(notify(`A new blog ${newBlog.title} by ${author} added`))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		addNewBlog({ title, url })
		setTitle('')
		setUrl('')
	}
	return (
		<Toggable openButtonLabel="create" closeButtonLabel="cancel" ref={toggableRef}>
			<h2>Create a new blog</h2>
			<form onSubmit={handleSubmit}>
				<div>
					title
					<input
						id="blog-title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="title of the blog"
					/>
				</div>
				<div>
					url
					<input
						id="blog-url"
						value={url}
						onChange={(e) => setUrl(e.target.value)}
						placeholder="url of the blog"
					/>
				</div>
				<div>author: {author}</div>
				<button id="blog-save-button" type="submit">
					save
				</button>
			</form>
		</Toggable>
	)
}

BlogForm.displayName = 'BlogForm'

BlogForm.propTypes = {
	author: PropTypes.string.isRequired,
}

export default BlogForm
