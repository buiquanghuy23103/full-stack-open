// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('createUser', function(username, name) {
	const credentials = {
		username: username,
		name: name,
		password: 'pa55word'
	}
	cy.request('POST', 'http://localhost:3001/api/users', credentials)
})

Cypress.Commands.add('login', function (username) {
	const credentials = {
		username: username,
		password: 'pa55word'
	}
	cy.request('POST', 'http://localhost:3001/api/login', credentials)
		.then(({ body }) => {
			localStorage.setItem('user', JSON.stringify(body))
			cy.visit('http://localhost:3000/')
		})
})

Cypress.Commands.add('createBlog', function (newBlog) {
	const user = JSON.parse(localStorage.getItem('user'))
	cy.request({
		url: 'http://localhost:3001/api/blogs',
		method: 'POST',
		body: newBlog,
		headers: {
			'Authorization': `bearer ${user.token}`
		}
	})
	cy.visit('http://localhost:3000/')
})