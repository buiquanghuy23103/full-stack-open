import { forwardRef, useState } from "react"
import Toggable from "./Toggable"

const BlogForm = forwardRef(({
	addNewBlog,
	author
}, ref) => {
	const [title, setTitle] = useState('')
	const [url, setUrl] = useState('')
	const handleSubmit = async e => {
		e.preventDefault()
		addNewBlog({ title, url })
		setTitle('')
		setUrl('')
	}
	return (
		<Toggable buttonLabel="create a new blog" ref={ref}>
			<h2>Create a new blog</h2>
			<form onSubmit={handleSubmit}>
				<div>
					title
					<input
						value={title}
						onChange={e => setTitle(e.target.value)}
					/>
				</div>
				<div>
					url
					<input
						value={url}
						onChange={e => setUrl(e.target.value)}
					/>
				</div>
				<div>
					author: { author }
				</div>
				<button type="submit">save</button>
			</form>
		</Toggable>
	)
})

export default BlogForm