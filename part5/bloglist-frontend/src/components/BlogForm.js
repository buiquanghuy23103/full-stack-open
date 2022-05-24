import { useState } from "react"
import Toggable from "./Toggable"

const BlogForm = ({
	addNewBlog
}) => {
	const [title, setTitle] = useState('')
	const [url, setUrl] = useState('')
	const handleSubmit = async e => {
		e.preventDefault()
		addNewBlog({ title, url })
		setTitle('')
		setUrl('')
	}
	return (
		<Toggable buttonLabel="create a new blog">
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
				<button type="submit">save</button>
			</form>
		</Toggable>
	)
}

export default BlogForm