import React, { useState } from 'react'
import personService from '../services/persons'


const PersonForm = ( { persons, setPersons, setNotificationData } ) => {
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const handleNewUserNameChange = (event) => setNewName(event.target.value)
  const handleNewUserNumberChange = (event) => setNewNumber(event.target.value)

  const foundByName = persons.find(element => element ? element.name === newName : false)

  const emptyNotification = {
    type: null,
    message: null
  }

  const updatePerson = (id, personData) => {
    if(window.confirm(`${personData.name} is already to phonebook, replace the old number with a new one?`)) {
      personService.update(id, personData).then(response => {
      /**
       * if not exit person with this id return null.
       */
        if(response.data) {
          setNotificationData({
            type : 'success',
            message : `Modified ${personData.name}`
          })
          setTimeout(() => { setNotificationData(emptyNotification) }, 5000)
          setPersons(persons.map(person => person.id !== id ? person : response.data))
        }
        else {
          setNotificationData({
            type : 'error',
            message : `Imformation of '${personData.name}' has already been removed from server`
          })
          setTimeout(() => { setNotificationData(emptyNotification) }, 5000)
          setPersons(persons.filter(p => p.id !== id))
        }
      }).catch(error => {
        /**
         * validation errors
         */
        setNotificationData({
          type : 'error',
          message : error.response.data.error
        })
        setTimeout(() => {
          setNotificationData(emptyNotification)
        }, 5000)
      })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()

    if(newName === '' || newNumber === '') {
      alert('Name and number cannot be empty')
    }
    else {
      const personData = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }
      if (foundByName) {
        updatePerson(foundByName.id, personData)
      }
      else {
        personService.create(personData).then(response => {
          setNotificationData({
            type : 'success',
            message : `Added ${personData.name}`
          })
          setTimeout(() => { setNotificationData(emptyNotification) }, 5000)
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        }).catch(error => {
          setNotificationData({
            type : 'error',
            message : error.response.data.error
          })
          setTimeout(() => { setNotificationData(emptyNotification) }, 5000)
          setPersons(persons.filter(p => p.id !== personData.id))
        })
      }
    }
  }

  return (
    <form onSubmit={addPerson}>
      <div>name: <input value={newName} onChange={handleNewUserNameChange}/></div>
      <div>number: <input value={newNumber} onChange={handleNewUserNumberChange}/></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

export default PersonForm