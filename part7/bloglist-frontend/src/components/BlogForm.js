import { useRef, useState } from 'react'
import Toggable from './Toggable'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'

const BlogForm = () => {
	const dispatch = useDispatch()
	const user = useSelector(state => state.user)
	const [title, setTitle] = useState('')
	const [url, setUrl] = useState('')
	const toggableRef = useRef(null)

	if (!user) return null
	const { name, token } = user

	const addNewBlog = async (newBlog) => {
		dispatch(createBlog(token, newBlog))
		toggableRef.current.toggleVisible()
		dispatch(notify(`A new blog ${newBlog.title} by ${name} added`))
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
				<div>author: {name}</div>
				<button id="blog-save-button" type="submit">
					save
				</button>
			</form>
		</Toggable>
	)
}

export default BlogForm
