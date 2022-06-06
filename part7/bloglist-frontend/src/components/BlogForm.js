import { useRef } from 'react'
import Toggable from './Toggable'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'
import useField from '../hooks/useField'

const BlogForm = () => {
	const dispatch = useDispatch()
	const user = useSelector(state => state.user)
	const title = useField('title', 'text')
	const url = useField('url', 'text')
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
		addNewBlog({ title: title.value, url: url.value })
		title.reset()
		url.reset()
	}
	return (
		<Toggable openButtonLabel="create" closeButtonLabel="cancel" ref={toggableRef}>
			<h2>Create a new blog</h2>
			<form onSubmit={handleSubmit}>
				<div>
					title
					<input
						id="blog-title"
						{ ...title.inputProps }
						placeholder="title of the blog"
					/>
				</div>
				<div>
					url
					<input
						id="blog-url"
						{ ...url.inputProps }
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
