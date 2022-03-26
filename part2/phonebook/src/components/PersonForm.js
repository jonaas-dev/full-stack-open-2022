import React, { useState } from 'react'

const PersonForm = ({persons, setPersons}) => {
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
  
    const handleNewUserNameChange = (event) => setNewName(event.target.value)
    const handleNewUserNumberChange = (event) => setNewNumber(event.target.value)

    const addNewPerson = (event) => {
        event.preventDefault()
    
        const found = persons.find(element => element.name === newName)
        if(found) {
          alert(`${newName} is already added to phonebook`)
        }
        else {
          setPersons(persons.concat({
            name: newName,
            number: newNumber,
            id: persons.length + 1,
          }))
          setNewName('')
          setNewNumber('')
        }
      }

    return (
        <form onSubmit={addNewPerson}>
            <div>name: <input value={newName} onChange={handleNewUserNameChange}/></div>
            <div>number: <input value={newNumber} onChange={handleNewUserNumberChange}/></div>
            <div><button type="submit">add</button></div>
        </form>
    )
}

export default PersonForm