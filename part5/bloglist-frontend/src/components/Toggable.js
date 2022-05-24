import { forwardRef, useImperativeHandle, useState } from "react"

const Toggable = forwardRef(({ children, buttonLabel }, ref) => {
	const [visible, setVisible] = useState(false)

	const toggleVisible = () => setVisible(!visible)

	useImperativeHandle(ref, () => {
		return { toggleVisible }
	})

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
})

export default Toggable