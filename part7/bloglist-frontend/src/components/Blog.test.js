import React from 'react'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('Default blog display', () => {
	let blog
	beforeEach(() => {
		blog = {
			title: 'React patterns',
			author: {
				username: 'edijkstra',
				name: 'Edsger W. Dijkstra',
			},
			url: 'https://reactpatterns.com/',
			likes: 7,
		}

		render(<Blog blog={blog} />)
	})

	test('renders blog title and author', () => {
		screen.getByText(blog.title, { exact: false })
		screen.getByText(blog.author.name, { exact: false })
	})

	test('not render blog likes and url by default', () => {
		const url = screen.queryByText(blog.url)
		expect(url).toBeNull()
		const likes = screen.queryByText(blog.likes)
		expect(likes).toBeNull()
	})
})

describe('when blog details are shown', () => {
	let blog
	const incrementLike = jest.fn()
	beforeEach(async () => {
		blog = {
			title: 'React patterns',
			author: {
				username: 'edijkstra',
				name: 'Edsger W. Dijkstra',
			},
			url: 'https://reactpatterns.com/',
			likes: 7,
		}

		render(<Blog blog={blog} incrementLike={incrementLike} />)
		const user = userEvent.setup()
		const viewButton = screen.getByRole('button', { name: /view/ })
		await user.click(viewButton)
	})

	test('should show likes and url', () => {
		screen.getByText(blog.url, { exact: false })
		screen.getByText(blog.likes, { exact: false })
	})

	test('should increment likes twice if like button is clicked twice', async () => {
		const likeButton = screen.getByRole('button', { name: /like/ })
		const user = userEvent.setup()
		await user.click(likeButton)
		await user.click(likeButton)

		expect(incrementLike.mock.calls).toHaveLength(2)
	})
})
