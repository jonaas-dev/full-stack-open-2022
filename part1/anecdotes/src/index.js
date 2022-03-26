import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Anecdote = (props) => {

  return (
    <div>
      {props.anecdote}
      <br></br>
      has {props.points} votes
    </div>
  )
}


const App = (props) => {

  const [selected, setSelected] = useState(0)
  const [points, setVotes] = useState(() => {
    // Initialize Points
    return Array(props.anecdotes.length).fill(0)
  })

  // Retorna un entero aleatorio entre min (incluido) y max (excluido)
  // ¡Usando Math.round() te dará una distribución no-uniforme!
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const handleNextAnecdoteClick = () => {
    setSelected(getRandomInt(0, props.anecdotes.length))
  }

  const handleVoteClick = () => {
    const copy = [...points]
    copy[selected] += 1
    setVotes(copy)
  }

  var indexOfMaxPoint = points.indexOf(Math.max(...points));

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <Anecdote anecdote={props.anecdotes[selected]} points={points[selected]} />

      <Button onClick={handleVoteClick} text='vote' />
      <Button onClick={handleNextAnecdoteClick} text='next anecdote' />

      <h2>Anecdote with most votes</h2>
      <Anecdote anecdote={props.anecdotes[indexOfMaxPoint]} points={points[indexOfMaxPoint]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)