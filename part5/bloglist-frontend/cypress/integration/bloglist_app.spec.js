describe('When not logged in', function() {
	beforeEach(function () {
		cy.visit('http://localhost:3000')
	})

	it('front page can be opened', function () {
		cy.contains('blogs')
	})

	it('login form can be opened', function() {
		cy.contains('login').click()
	})

	it('user can login', function () {
		cy.contains('login').click()
		cy.get('#username').type('mchan')
		cy.get('#password').type('pa55word')
		cy.get('#login-button').click()
		cy.contains('Michael Chan logged in')
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