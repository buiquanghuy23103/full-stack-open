import Toggable from "./Toggable"

const Blog = ({blog}) => (
	<div className="blog">
		{blog.title}
		<Toggable openButtonLabel="view" closeButtonLabel="hide">
			<p>Author: {blog.author.name}</p>
			<p>Url: {blog.url}</p>
			<div>
				Likes: {blog.likes}
				<button>like</button>
			</div>
		</Toggable> 
	</div>
)

export default Blog