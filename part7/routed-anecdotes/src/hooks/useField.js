import { useState } from "react"

const useField = (name, type) => {
	const [value, setValue] = useState('')

	const onChange = (event) => {
		setValue(event.target.value)
	}

	const reset = () => setValue('')

	return {
		name,
		value,
		onChange,
		type,
		reset
	}
}

export default useField