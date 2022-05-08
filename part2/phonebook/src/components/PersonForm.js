import React, { useState } from 'react'
import personService from '../services/persons'

const PersonForm = ({persons, setPersons}) => {
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
  
    const handleNewUserNameChange = (event) => setNewName(event.target.value)
    const handleNewUserNumberChange = (event) => setNewNumber(event.target.value)

    const foundByName = persons.find(element => element.name === newName)

    const updatePerson = (id, personData) => {
      if(window.confirm(`${personData.name} is already to phonebook, replace the old number with a new one?`)) {
        personService
        .update(id, personData).then(response => {
          debugger
          setPersons(persons.map(person => person.id !== id ? person : response.data))
        })
        .catch(error => {
          alert(
            `the person '${personData.name}' was already deleted from server`
          )
          setPersons(persons.filter(p => p.id !== id))
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
            personService
            .create(personData)
            .then(response => {
              setPersons(persons.concat(response.data))
              setNewName('')
              setNewNumber('')
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