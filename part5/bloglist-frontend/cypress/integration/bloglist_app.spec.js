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

	describe('When logged in', () => {
		beforeEach(function () {
			cy.createUser('mchan', 'Michael Chan')
			cy.login('mchan')
		})

		it('a blog can be created', function () {
			cy.get('#blog-title').type('Test title')
			cy.get('#blog-url').type('Test url')
			cy.get('#blog-save-button').click()
			cy.contains('Test title by Michael Chan')
		})

		it('users can like a blog', function () {
			cy.createBlog({
				title: 'A new blog title',
				url: 'https://example.com',
				likes: 1
			})
			cy.get('#blog-view-button').click()
			cy.get('#blog-like-button').click()
			cy.contains('Likes: 2')
		})

		it('users can delete their own blogs', function() {
			cy.createBlog({
				title: 'A new blog title',
				url: 'https://example.com',
				likes: 1
			})
			cy.get('#blog-view-button').click()
			cy.get('#blog-delete-button').click()
		})

		it('unauthorized users cannot delete blog', function() {
			cy.createUser('user1', 'User One')
			cy.login('user1')
			const newBlog = {
				title: 'A new blog',
				url: 'https://example2.com'
			}
			cy.createBlog(newBlog)
			cy.get('#logout-button').click()
			cy.login('mchan')
			cy.get('#blog-view-button').click()
			cy.contains(newBlog.title)
				.get('#blog-delete-button')
				.should('not.be.visible')
		})

		it.only('blog list is in ascending order', function() {
			cy.createBlog({
				title: 'Worst likes',
				url: 'https://example.com'
			})
			cy.createBlog({
				title: 'Most likes',
				url: 'https://example.com'
			})
			cy.createBlog({
				title: 'Second most likes',
				url: 'https://example.com'
			})

			cy.contains('Most likes')
				.contains('view')
				.click()
			cy.contains('Most likes')
				.contains('like')
				.as('hot-button')
			cy.get('@hot-button').click()
			cy.get('@hot-button').click()
			cy.get('@hot-button').click()

			cy.contains('Second most likes')
				.contains('view')
				.click()
			cy.contains('Second most likes')
				.contains('like')
				.as('normal-button')
			cy.get('@normal-button').click()
			cy.get('@normal-button').click()

			cy.get('.blog').eq(0).should('contain', 'Most likes')
			cy.get('.blog').eq(1).should('contain', 'Second most likes')
		})
	})
})