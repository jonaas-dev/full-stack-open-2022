import Filter from './components/Filter'
import Countries from './components/Countries'
import Country from './components/Country'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [ filter, setFilter ] = useState('')

  const endPoint = 'https://restcountries.com/v3.1/all';

  const hook = () => {
    axios
      .get(endPoint)
      .then(response => {
        setCountries(response.data)
      })
  }

  useEffect(hook, [])

  const countriesToShow = filter === ''
  ? countries
  : countries.filter((country) => {
    return country.name.common.includes(filter) || filter === country.ccn3
  })

  return (
    <>
      <h2>Countries</h2>
      <Filter filter={filter} setFilter={setFilter} />
      {
        (countriesToShow.length === 1 && filter !== '') ? <Country country={countriesToShow[0]}/>
        : (countriesToShow.length > 10 && filter !== '') ? <p>Too many matches, specify another filter</p>
        : <Countries countries={countriesToShow}/>
      }
    </>
  )
}

export default App