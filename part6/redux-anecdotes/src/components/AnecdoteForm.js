import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

const AnecdoteForm = () => {
  // state = anecdotes.
  const anecdotes = useSelector((state) => { return [...state].sort((a, b) => { return b.votes - a.votes }) })
  console.log(anecdotes)

    const dispatch = useDispatch()

    /**
     * Cabe señalar que no hemos vinculado el estado de los campos del formulario al 
     * estado del componente App como lo hicimos anteriormente. React llama a este tipo de formulario no controlado.
     */
    const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
  }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="anecdote" /></div>
                <button type="submit">create</button>
            </form>
        </>
    )
  }
  
  export default AnecdoteForm