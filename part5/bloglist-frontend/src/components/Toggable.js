import { useState } from "react"

const Toggable = ({ children, buttonLabel }) => {
	const [visible, setVisible] = useState(false)

	const toggleVisible = () => setVisible(!visible)

	if (visible)
		return (
			<div>
				{ children }
				<button onClick={toggleVisible}>cancel</button>
			</div>
		)

	return (
		<button onClick={toggleVisible}>{ buttonLabel }</button>
	)
}

export default Toggable