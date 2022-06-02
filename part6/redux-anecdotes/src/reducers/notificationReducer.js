import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	timeoutId: null,
	message: ''
}

const vote = (state, action) => {
	state.message = action.payload
}

const clear = (state, action) => {
	state.message = ''
}

const updateTimeoutId = (state, action) => {
	state.timeoutId = action.payload
}

const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		vote,
		clear,
		updateTimeoutId
	}
})

export const notificationActions = notificationSlice.actions

export const setNotification = (message, timeSec) => {
	return async (dispatch, getState) => {
		clearTimeout(getState().notification.timeoutId)
		dispatch(notificationActions.vote(message))
		const timeoutId = setTimeout(() => {
			dispatch(notificationActions.clear())
		}, timeSec * 1000)
		dispatch(notificationActions.updateTimeoutId(timeoutId))
	}
}

const notificationReducer = notificationSlice.reducer
export default notificationReducer