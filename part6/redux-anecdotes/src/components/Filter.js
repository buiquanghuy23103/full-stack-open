import { useDispatch } from "react-redux"
import { filterActions } from "../reducers/filterReducer"

const Filter = () => {
	const dispatch = useDispatch()
	const handleChange = (event) => {
		const filterTerm = event.target.value
		dispatch(filterActions.updateFilter(filterTerm))
	}
	const style = {
	  marginBottom: 10
	}
  
	return (
	  <div style={style}>
		filter <input onChange={handleChange} />
	  </div>
	)
  }
  
  export default Filter