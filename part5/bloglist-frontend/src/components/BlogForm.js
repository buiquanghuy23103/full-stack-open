const BlogForm = ({
	title,
	url,
	onTitleChange,
	onUrlChange,
	handleSubmit
}) => {
	return (
		<form onSubmit={handleSubmit}>
			<div>
				title
				<input
					value={title}
					onChange={onTitleChange}
				/>
			</div>
			<div>
				url
				<input
					value={url}
					onChange={onUrlChange}
				/>
			</div>
			<button type="submit">save</button>
		</form>
	)
}

export default BlogForm