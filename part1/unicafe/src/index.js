import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Title = (props) => {
  return (
    <h2>{props.title}</h2>
  )
}

const Statics = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const DisplayWeightedAverage = (props) => {
  var average = 0;
  var sum = 0;
  var count = 0;

  for(var i = 0; i < props.values.length; i++) {
    sum += (props.values[i] * props.weights[i]);
    count += props.values[i];
  }  
  
  average = count !== 0 ? sum / count : 0;
  
  return (
    <Statics text={props.text} value={average.toFixed(1)} />
  )
}

const DisplayAverage = (props) => {
  var average = props.value > 0 
    ? (props.value / props.total ) * 100
    : 0;

  return (
    <Statics text={props.text} value={average.toFixed(1) + " %"} />
  )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Statistics = (props) => {
  var good = props.data.values[0];
  var neutral = props.data.values[1];
  var bad = props.data.values[2];

  var total = good + neutral + bad;

  if(total === 0) {
    return (
      <p>No feddback given</p>
    )
  }
  else {

    return (
      <div>
        <Title title={props.text} />
        <table>
          <tbody>
            <Statics text="good" value={good}/>
            <Statics text="neutral" value={neutral}/>
            <Statics text="bad" value={bad}/>
            <Statics text="all" value={total}/>

            <DisplayWeightedAverage 
              text="average" 
              values={props.data.values} 
              weights={props.data.weights}
            />

            <DisplayAverage 
              text="positive" 
              value={good} 
              total={total}
            />
          </tbody>
        </table>
      </div>
    ) 
  }
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  const content = {
    values : [good, neutral, bad],
    weights : [1, 0, -1]
  }

  return (
    <div>
      <Title title='give feedback' />

      <Button onClick={handleGoodClick} text='good' />
      <Button onClick={handleNeutralClick} text='neutral' />
      <Button onClick={handleBadClick} text='bad' />

      <Statistics text='statistics' data={content}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)