import React from 'react'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('Default blog display', () => {
	let blog
	beforeEach(() => {
		blog = {
			title: 'React patterns',
			author: {
				username: 'edijkstra',
				name: 'Edsger W. Dijkstra'
			},
			url: 'https://reactpatterns.com/',
			likes: 7
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