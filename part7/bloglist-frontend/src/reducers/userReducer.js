import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
	name: 'user',
	initialState: null,
	reducers: {
		setUser(state, action) {
			return action.payload
		},
		removeUser() {
			return null
		}
	}
})

export const userActions = slice.actions

const userReducer = slice.reducer
export default userReducer