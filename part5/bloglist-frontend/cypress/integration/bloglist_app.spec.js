describe('Blog app', function() {
	beforeEach(function () {
		cy.request('POST', 'http://localhost:3001/api/testing/reset')
		cy.visit('http://localhost:3000')
	})

	it('front page can be opened', function () {
		cy.contains('blogs')
	})

	it.only('Login form is shown', function () {
		cy.get('#username')
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