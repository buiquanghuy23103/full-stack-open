import { useState } from "react"

const Blog = ({ blog, incrementLike }) => {
	const [showDetails, setShowDetails] = useState(false)

	const toggleDetailsView = () => setShowDetails(!showDetails)

	const displaySettings = {
		display: showDetails ? '' : 'none'
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
			</div>
		</div>
	)
}

export default Blog