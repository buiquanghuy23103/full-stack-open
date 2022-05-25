import { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'

const Toggable = forwardRef((
	{ children, openButtonLabel, closeButtonLabel },
	ref
) => {
	const [visible, setVisible] = useState(false)

	const toggleVisible = () => setVisible(!visible)

	useImperativeHandle(ref, () => {
		return { toggleVisible }
	})

	if (visible)
		return (
			<div>
				{ children }
				<button onClick={toggleVisible}>{ closeButtonLabel }</button>
			</div>
		)

	return (
		<button onClick={toggleVisible}>{ openButtonLabel }</button>
	)
})

Toggable.displayName = 'Toggable'

Toggable.propTypes = {
	openButtonLabel: PropTypes.string.isRequired,
	closeButtonLabel: PropTypes.string.isRequired,
}

export default Toggable