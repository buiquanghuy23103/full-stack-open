const User = require('../models/user')
const bcrypt = require('bcrypt')
const { usersInDb } = require('./test_helpers')
const supertest = require('supertest')
const app = require('../app')
const { default: mongoose } = require('mongoose')
const api = supertest(app)

describe('When there is one user in db', () => {
	beforeEach(async () => {
		await User.deleteMany({})
		const hash = await bcrypt.hash('konfidensal', 10)
		const data = {
			username: 'dummy',
			name: 'Dum My',
			passwordHash: hash
		}
		const user = new User(data)
		await user.save()
	})

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

afterAll(() => {
	mongoose.connection.close()
})