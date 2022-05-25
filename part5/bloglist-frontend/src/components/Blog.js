import { useState } from "react"

const Blog = ({ blog, incrementLike }) => {
	const [showDetails, setShowDetails] = useState(false)

	const toggleDetailsView = () => setShowDetails(!showDetails)

	const displaySettings = {
		display: showDetails ? '' : 'none'
	}

	const showDeleteButton = () => {
		const cachedData = window.localStorage.getItem('user')
		const user = JSON.parse(cachedData)
		return user.username === blog.author.username
	}

	const deleteButtonStyle = {
		display: showDeleteButton() ? '' : 'none'
	}

	return (
		<div className="blog">
			{blog.title}
			<button onClick={toggleDetailsView}>
				{ showDetails ? 'hide' : 'view' }
			</button>
			<div style={displaySettings}>
				<p>Author: {blog.author.name}</p>
				<p>Url: {blog.url}</p>
				<div>
					Likes: {blog.likes}
					<button onClick={incrementLike}>like</button>
				</div>
				<button style={deleteButtonStyle}>remove</button>
			</div>
		</div>
	)
}

export default Blog