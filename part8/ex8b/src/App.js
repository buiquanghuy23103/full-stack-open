import { useSubscription } from '@apollo/client'
import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'
import queries, { SUB_BOOK_ADDED } from './queries'

const App = () => {
	const [page, setPage] = useState('authors')
	const [loggedIn, setLoggedIn] = useState(false)

	useSubscription(SUB_BOOK_ADDED, {
		onSubscriptionData: ({ subscriptionData, client }) => {
			const addedBook = subscriptionData.data.bookCreated
			client.cache.updateQuery(
				{ query: queries.ALL_BOOKS },
				({ allBooks }) => {
					return {
						allBooks: allBooks.concat(addedBook)
					}
				}
			)
		}
	})

	useEffect(() => {
		const token = localStorage.getItem('userToken')
		setLoggedIn(!!token)
	}, [])

	const handleSuccessLogin = res => {
		localStorage.setItem('userToken', res.data.login.value)
		setLoggedIn(true)
		setPage('authors')
	}
	const logout = () => {
		setLoggedIn(false)
		localStorage.clear()
		setPage('authors')
	}

  return (
    <div>
      <div>
		<button onClick={() => setPage('authors')}>authors</button>
		<button onClick={() => setPage('books')}>books</button>
		<button onClick={() => setPage('recommend')}>recommend</button>
		<button
			style={{ display: loggedIn ? '' : 'none' }}
			onClick={() => setPage('add')}>add book</button>
		<button
			style={{ display: !loggedIn ? '' : 'none' }}
			onClick={() => setPage('login')}>login</button>
		<button
			style={{ display: loggedIn ? '' : 'none' }}
				  onClick={logout}>logout</button>
			  
      </div>

      <Authors show={page === 'authors'} />

		  <Books show={page === 'books'} />
		  
		  <Recommend show={page === 'recommend'} />

      <NewBook show={page === 'add'} />
		  <Login
			  show={page === 'login' && !loggedIn}
			  handleSuccessLogin={handleSuccessLogin} />
    </div>
  )
}

export default App
