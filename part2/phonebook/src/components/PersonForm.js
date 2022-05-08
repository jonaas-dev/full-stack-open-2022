import React, { useState } from 'react'
import personService from '../services/persons'

const PersonForm = ({persons, setPersons}) => {
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
  
    const handleNewUserNameChange = (event) => setNewName(event.target.value)
    const handleNewUserNumberChange = (event) => setNewNumber(event.target.value)

    const addPerson = (event) => {
        event.preventDefault()
    
        const found = persons.find(element => element.name === newName)
        if(found) {
          alert(`${newName} is already added to phonebook`)
        }
        else if(newName === '' || newNumber === '') {
          alert('Name and number cannot be empty')
        }
        else {
          personService
          .create({
            name: newName,
            number: newNumber,
            id: persons.length + 1,
          })
          .then(response => {
            setPersons(persons.concat(response.data))
            setNewName('')
            setNewNumber('')
          })
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