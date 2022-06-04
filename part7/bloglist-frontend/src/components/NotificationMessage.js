const NotificationMessage = ({ message }) => {
	if (!message) return null
	return <div className="notification">{message}</div>
}

export default NotificationMessage
