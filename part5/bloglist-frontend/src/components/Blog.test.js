import React from 'react'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders blog title', () => {
	const blog = {
		title: 'React patterns',
		author: {
			username: 'edijkstra',
			name: 'Edsger W. Dijkstra'
		},
		url: 'https://reactpatterns.com/',
		likes: 7
	}

	render(<Blog blog={blog} />)

	const elem = screen.getByText(blog.title)
	expect(elem).toBeDefined()
})