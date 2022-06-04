import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('default blog form', () => {
	test('should add correct form details on click', async () => {
		const addNewBlog = jest.fn()
		const author = 'John Doe'
		const user = userEvent.setup()
		const newBlog = {
			title: 'React pattern',
			url: 'https://hello.com'
		}

		render(<BlogForm addNewBlog={ addNewBlog } author={ author } />)

		const createBlogButton = screen.getByRole('button', {
			name: /create a new blog/
		})
		await user.click(createBlogButton)

		const titleInput = screen.getByPlaceholderText('title of the blog')
		await user.type(titleInput, newBlog.title)

		const urlInput = screen.getByPlaceholderText('url of the blog')
		await user.type(urlInput, newBlog.url)

		const saveButton = screen.getByRole('button', {
			name: /save/
		})
		await user.click(saveButton)

		expect(addNewBlog.mock.calls).toHaveLength(1)
		expect(addNewBlog.mock.calls[0][0]).toEqual(newBlog)
	})
})