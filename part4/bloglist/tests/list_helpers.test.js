const { dummy, totalLikes, favoriteBlog, mostBlog, mostLikes } = require('../utils/list_helpers')

test('dummy return one', () => {
	const blogs = []
	expect(dummy(blogs)).toBe(1)
})

describe('totalLikes', () => { 
	test('of empty list is zero', () => {
		const blogs = []
		expect(totalLikes(blogs)).toBe(0)
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
		expect(totalLikes(blogs)).toBe(3)
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
		expect(totalLikes(blogs)).toBe(42)
	})
})

describe('optional tests', () => {
	const blogs = [
		{
			_id: '5a422a851b54a676234d17f7',
			title: 'React patterns',
			author: 'Michael Chan',
			url: 'https://reactpatterns.com/',
			likes: 7,
			__v: 0
		},
		{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 5,
			__v: 0
		},
		{
			_id: '5a422b3a1b54a676234d17f9',
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
			likes: 12,
			__v: 0
		},
		{
			_id: '5a422b891b54a676234d17fa',
			title: 'First class tests',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
			likes: 10,
			__v: 0
		},
		{
			_id: '5a422ba71b54a676234d17fb',
			title: 'TDD harms architecture',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
			likes: 0,
			__v: 0
		},
		{
			_id: '5a422bc61b54a676234d17fc',
			title: 'Type wars',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
			likes: 2,
			__v: 0
		}
	]
	test('favoriteBlog', () => {
		expect(favoriteBlog(blogs)).toEqual(
			{
				_id: '5a422b3a1b54a676234d17f9',
				title: 'Canonical string reduction',
				author: 'Edsger W. Dijkstra',
				url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
				likes: 12,
				__v: 0
			}
		)
	})
	test('mostBlog', () => {
		expect(mostBlog(blogs)).toEqual({
			author: 'Robert C. Martin',
			blogs: 3
		})
	})
	test('mostLikes', () => {
		expect(mostLikes(blogs)).toEqual({
			author: 'Edsger W. Dijkstra',
			likes: 17
		})
	})
})