import { useSelector } from "react-redux"

const Notification = () => {
	const notification = useSelector(state => state.notification)
	const show = {
		border: 'solid',
		padding: 10,
		borderWidth: 1
	}
	const hide = {
		display: 'none'
	}
	return (
		<div style={!!notification ? show : hide}>
			{ notification }
		</div>
	)
}

export default Notification