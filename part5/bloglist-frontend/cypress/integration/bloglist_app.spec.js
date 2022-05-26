describe('Blog list app', function() {
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