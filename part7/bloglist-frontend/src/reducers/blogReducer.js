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
			return state.filter(blog => blog.id === id)
		},
		incrementLike(state, action) {
			const id = action.payload
			const blog = state.find(a => a.id === id)
			blog.likes++
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

const blogReducer = slice.reducer
export default blogReducer