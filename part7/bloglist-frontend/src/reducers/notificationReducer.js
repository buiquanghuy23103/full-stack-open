import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
	name: 'notification',
	initialState: null,
	reducers: {
		set(state, action) {
			return action.payload
		},
		clear() {
			return null
		}
	}
})

export const notificationActions = slice.actions

const notificationReducer = slice.reducer
export default notificationReducer