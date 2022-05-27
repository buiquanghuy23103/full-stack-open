describe('Blog app', function() {
	beforeEach(function () {
		cy.request('POST', 'http://localhost:3001/api/testing/reset')
		cy.visit('http://localhost:3000')
	})

	it('front page can be opened', function () {
		cy.contains('blogs')
	})

	it('Login form is shown', function () {
		cy.get('#username')
	})

	describe('Login', () => {
		it('fails with wrong credentials', function () {
			cy.get('#username').type('abcde')
			cy.get('#password').type('abcdefghijklm')
			cy.get('#login-button').click()
			cy.contains('Wrong username or password')
		})

		it('succeeds with correct credentials', function () {
			const credentials = {
				username: 'mchan',
				name: 'Michael Chan',
				password: 'pa55word'
			}
			cy.request('POST', 'http://localhost:3001/api/users', credentials)
			cy.get('#username').type(credentials.username)
			cy.get('#password').type(credentials.password)
			cy.get('#login-button').click()
			cy.contains(`${credentials.name} logged in`)
		})
	})
})

describe('When logged in', () => {
	beforeEach(function () {
		cy.login()
	})

	it('a blog can be created', function () {
		cy.contains('create').click()
		cy.get('#blog-title').type('Test title')
		cy.get('#blog-url').type('Test url')
		cy.get('#blog-save-button').click()
		cy.contains('Test title')
	})
})