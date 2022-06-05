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

export const notify = (message) => {
	return dispatch => {
		const { set, clear } = notificationActions
		dispatch(set(message))
		setTimeout(() => {
			dispatch(clear())
		}, 5000)
	}
}

const notificationReducer = slice.reducer
export default notificationReducer