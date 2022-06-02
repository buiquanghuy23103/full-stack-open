import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const vote = (state, action) => {
	return action.payload
}

const clear = (state, action) => {
	return ''
}

const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		vote,
		clear
	}
})

export const notificationActions = notificationSlice.actions

export const setNotification = (message, timeSec) => {
	return async dispatch => {
		dispatch(notificationActions.vote(message))
		setTimeout(() => {
			dispatch(notificationActions.clear())
		}, timeSec * 1000)
	}
}

const notificationReducer = notificationSlice.reducer
export default notificationReducer