import { useState } from 'react'

const useField = (name, type) => {
	const [value, setValue] = useState('')

	const onChange = event => {
		setValue(event.target.value)
	}

	const reset = () => setValue('')

	const inputProps = {
		value,
		onChange,
		type,
		name
	}

	return {
		value,
		onChange,
		type,
		name,
		reset,
		inputProps
	}
}

export default useField