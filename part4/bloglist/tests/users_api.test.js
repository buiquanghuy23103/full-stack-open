const { usersInDb, initDb } = require('./test_helpers')
const supertest = require('supertest')
const app = require('../app')
const { default: mongoose } = require('mongoose')
const User = require('../models/user')
const api = supertest(app)

describe('When there are no users in db', () => {
	beforeEach(async () => await User.deleteMany({}))
	test('create a user if request succeeds', async () => {
		const usersAtStart = await usersInDb()
		const dummyUser = {
			username: 'jdoe',
			name: 'John Doe',
			password: 'pa55word'
		}

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

describe('When there are users in db', () => {
	beforeEach(async () => initDb())

	test('dont add duplicate username', async () => {
		const usersAtStart = await usersInDb()
		const duplicateUser = {
			username: usersAtStart[0].username,
			name: 'Duplicate User',
			password: 'secret'
		}
		const result = await api
			.post('/api/users')
			.send(duplicateUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toBe('username must be unique')
		const usersAtEnd = await usersInDb()
		expect(usersAtEnd).toEqual(usersAtStart)
	})
})

afterAll(() => {
	mongoose.connection.close()
})