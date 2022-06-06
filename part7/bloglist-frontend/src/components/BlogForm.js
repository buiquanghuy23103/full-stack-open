import { useRef } from 'react'
import Toggable from './Toggable'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'
import useField from '../hooks/useField'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

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
			<Form onSubmit={handleSubmit}>
				<Form.Group>
					<Form.Label>Title</Form.Label>
					<Form.Control
						id="blog-title"
						{ ...title.inputProps }
						placeholder="title of the blog"
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Url</Form.Label>
					<Form.Control
						id="blog-url"
						{ ...url.inputProps }
						placeholder="url of the blog"
					/>
				</Form.Group>
				<div>Author: {name}</div>
				<Button id="blog-save-button" type="submit">
					save
				</Button>
			</Form>
		</Toggable>
	)
}

export default BlogForm
