import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const slice = createSlice({
	name: 'blog',
	initialState: [],
	reducers: {
		setBlogs(state, action) {
			return action.payload
		},
		addBlog(state, action) {
			state.push(action.payload)
		},
		deleteBlogById(state, action) {
			const id = action.payload
			return state.filter(blog => blog.id !== id)
		},
		incrementLike(state, action) {
			const id = action.payload
			const blog = state.find(a => a.id === id)
			blog.likes++
		},
		addComment(state, action) {
			const { blogId, comment } = action.payload
			const blog = state.find(a => a.id === blogId)
			blog.comments.push(comment)
		}
	}
})

export const blogActions = slice.actions

export const fetchBlogs = () => {
	return async dispatch => {
		const blogs = await blogService.getAll()
		dispatch(blogActions.setBlogs(blogs))
	}
}

export const createBlog = (token, newBlog) => {
	return async dispatch => {
		const response = await blogService.create(token, newBlog)
		dispatch(blogActions.addBlog(response))
	}
}

export const incrementLike = (token, blog) => {
	return async dispatch => {
		const updatedBlog = { ...blog, likes: blog.likes + 1 }
		await blogService.update(token, updatedBlog)
		dispatch(blogActions.incrementLike(blog.id))
	}
}

export const deleteBlogById = (token, id) => {
	return async dispatch => {
		await blogService.deleteBlog(token, id)
		dispatch(blogActions.deleteBlogById(id))
	}
}

export const addComment = (blogId, comment) => {
	return async dispatch => {
		await blogService.addComment(blogId, comment)
		dispatch(blogActions.addComment({ blogId, comment }))
	}
}

const blogReducer = slice.reducer
export default blogReducer