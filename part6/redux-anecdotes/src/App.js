import { useSelector, useDispatch } from 'react-redux'
import anecdoteActionCreators from './actionCreators/anecdoteActionCreators'

const App = () => {
  const anecdotes = useSelector(state => state.sort((a, b) => b.votes - a.votes))
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(anecdoteActionCreators.incrementVote(id))
  }

  const addAnecdote = (event) => {
	  event.preventDefault()
	  const newAnecdote = {
		  content: event.target.anecdote.value
	  }
	  dispatch(anecdoteActionCreators.addAnecdote(newAnecdote))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App