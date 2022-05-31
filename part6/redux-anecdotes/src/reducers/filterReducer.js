import { createSlice } from "@reduxjs/toolkit";

const updateFilter = (state, action) => {
	return action.payload
}

const filterSlice = createSlice({
	name: 'filter',
	initialState: '',
	reducers: {
		updateFilter
	}
})

export const filterActions = filterSlice.actions

const filterReducer = filterSlice.reducer
export default filterReducer