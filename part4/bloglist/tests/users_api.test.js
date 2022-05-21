const User = require('../models/user')
const bcrypt = require('bcrypt')
const { usersInDb, dummyUser } = require('./test_helpers')
const supertest = require('supertest')
const app = require('../app')
const { default: mongoose } = require('mongoose')
const api = supertest(app)

const dummyUserData = async () => {
	const hash = await bcrypt.hash('konfidensal', 10)
	return {
		username: 'dummy',
		name: 'Dum My',
		passwordHash: hash
	}
}

beforeEach(async () => {
	await User.deleteMany({})
	const data = await dummyUserData()
	const user = new User(data)
	await user.save()
})

describe('Create a user', () => { 
	test('create a user if request succeeds', async () => {
		const usersAtStart = await usersInDb()

		await api
			.post('/api/users')
			.send(dummyUser)
			.expect(201)
			.expect('Content-Type', /application\/json/)
		
		const usersAtEnd = await usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

		const usernames = usersAtEnd.map(u => u.username)
		expect(usernames).toContain(dummyUser.username)
	})
})

afterAll(() => {
	mongoose.connection.close()
})