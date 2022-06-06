import { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'

const Toggable = forwardRef(
	({ children, openButtonLabel, closeButtonLabel }, ref) => {
		const [visible, setVisible] = useState(true)

		const toggleVisible = () => setVisible(!visible)

		useImperativeHandle(ref, () => {
			return { toggleVisible }
		})

		if (visible)
			return (
				<div>
					{children}
					<Button
						variant='secondary'
						onClick={toggleVisible}>
						{closeButtonLabel}
					</Button>
				</div>
			)

		return <Button
			onClick={toggleVisible}>
			{openButtonLabel}
		</Button>
	}
)

Toggable.displayName = 'Toggable'

Toggable.propTypes = {
	openButtonLabel: PropTypes.string.isRequired,
	closeButtonLabel: PropTypes.string.isRequired,
}

export default Toggable
