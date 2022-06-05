import { createSlice } from '@reduxjs/toolkit'

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
		}
	}
})

export const blogActions = slice.actions

const blogReducer = slice.reducer
export default blogReducer