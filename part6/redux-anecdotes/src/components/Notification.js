import { connect } from "react-redux"

const Notification = ({ notification }) => {
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

const mapStateToProps = state => ({ notification: state.notification })

export default connect(mapStateToProps)(Notification)