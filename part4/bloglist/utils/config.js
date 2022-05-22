require('dotenv').config()

const MONGODB_URI = process.env.NODE_ENV === 'test'
	? process.env.MONGODB_URI
	: process.env.TEST_MONGODB_URI
const PORT = process.env.PORT || 3001
const SECRET = process.env.SECRET

const config = {
	MONGODB_URI,
	PORT,
	SECRET
}

module.exports = config