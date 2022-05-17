const helpers = require('../utils/list_helpers')

test('dummy return one', () => {
	const blogs = []
	expect(helpers.dummy(blogs)).toBe(1)
})

describe('totalLikes', () => { 
	test('of empty list is zero', () => {
		const blogs = []
		expect(helpers.totalLikes(blogs)).toBe(0)
	})
	test('when list has only one blog equals the likes of that', () => {
		const blogs = [
			{
				title: 'abcde',
				author: 'Huy Bui',
				url: 'http://localhost:3001',
				likes: 3
			}
		]
		expect(helpers.totalLikes(blogs)).toBe(3)
	})
	test('of a bigger list is calculated right', () => {
		const blogs = [
			{
				title: 'title1',
				author: 'author1',
				url: 'http://url1.com',
				likes: 30
			},
			{
				title: 'title2',
				author: 'author2',
				url: 'http://url2.com',
				likes: 12
			}
		]
		expect(helpers.totalLikes(blogs)).toBe(42)
	})
})