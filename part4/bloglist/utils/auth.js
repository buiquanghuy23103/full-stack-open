const getTokenFrom = (request) => {
	const auth = request.get('authorization')
	const bearer = auth && auth.toLowerCase().startsWith('bearer')
	return (bearer ? auth.substring(7) : null)
}

const auth = {
	getTokenFrom
}

module.exports = auth