import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'
import React, { useState, useEffect } from 'react'

const App = () => {
  const [persons, setPersons] = useState([])
  const [notificationData, setNotificationData] = useState({
    type: null,
    message: null
  })

  useEffect(() => {
    personService.getAll().then(response => {
      setPersons(response.data)
    })
  }, [])

  const [ filter, setFilter ] = useState('')

  const personsToShow = filter === ''
    ? persons
    : persons.filter((person) => {
      return filter === person.name || filter === person.number
    })


  return (
    <>
      <h2>Phonebook</h2>
      <Notification data={notificationData} />

      <Filter filter={filter} setFilter={setFilter} />

      <h3>Add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} setNotificationData={setNotificationData}/>

      <h3>Numbers</h3>
      <Persons persons={personsToShow} setPersons={setPersons} setNotificationData={setNotificationData}/>
    </>
  )
}

export default App