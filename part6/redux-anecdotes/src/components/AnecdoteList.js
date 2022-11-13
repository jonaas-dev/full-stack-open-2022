import { voteAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

const AnecdoteList = () => {
    // state = anecdotes.
    const anecdotes = useSelector((state) => { return [...state].sort((a, b) => { return b.votes - a.votes }) })
    console.log(anecdotes)

    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(voteAnecdote(id))
    }

    return (
        <div>
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
        </div>
    )
}

export default AnecdoteList