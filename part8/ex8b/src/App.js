import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'

const App = () => {
	const [page, setPage] = useState('authors')
	const [loggedIn, setLoggedIn] = useState(false)
	const handleSuccessLogin = () => {
		setLoggedIn(true)
		setPage('authors')
	}

  return (
    <div>
      <div>
		<button onClick={() => setPage('authors')}>authors</button>
		<button onClick={() => setPage('books')}>books</button>
		<button
			style={{ display: loggedIn ? '' : 'none' }}
			onClick={() => setPage('add')}>add book</button>
		<button
			style={{ display: !loggedIn ? '' : 'none' }}
			onClick={() => setPage('login')}>login</button>
		<button
			style={{ display: loggedIn ? '' : 'none' }}
			onClick={() => setPage('login')}>logout</button>
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />
		  <Login
			  show={page === 'login' && !loggedIn}
			  handleSuccessLogin={handleSuccessLogin} />
    </div>
  )
}

export default App
