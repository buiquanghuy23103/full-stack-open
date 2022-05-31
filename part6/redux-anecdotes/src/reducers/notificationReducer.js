import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const vote = (state, action) => {
	return `you voted '${action.payload.content}'`
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

const notificationReducer = notificationSlice.reducer
export default notificationReducer