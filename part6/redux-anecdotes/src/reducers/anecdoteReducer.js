const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const findAnecdoteById = function (anecdotes, id) {
  return anecdotes.find((n) => n.id === id)
}

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
  case 'NEW_ANECDOTE':
    return state.concat(action.data)
  case 'VOTE':
    // eslint-disable-next-line no-case-declarations
    const id = action.data.id
    // eslint-disable-next-line no-case-declarations
    const anecdoteToChange = findAnecdoteById(state, id)
    // eslint-disable-next-line no-case-declarations
    const changedAnecdote = { ...anecdoteToChange, votes: anecdoteToChange.votes + 1 }
    return state.map((anecdote) =>
      anecdote.id !== id ? anecdote : changedAnecdote
    )
  default:
    return state
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      content,
      id: getId(),
      votes: 0
    }
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export default reducer
