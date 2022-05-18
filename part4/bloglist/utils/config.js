require('dotenv').config()

const MONGODB_URI = process.env.NODE_ENV === 'development'
	? process.env.MONGODB_URI
	: process.env.TEST_MONGODB_URI
const PORT = process.env.PORT || 3001

const config = {
	MONGODB_URI,
	PORT
}

module.exports = config