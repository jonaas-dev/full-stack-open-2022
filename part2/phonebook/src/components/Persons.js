import Button from "./Button"
import personService from "../services/persons"
import { useState } from "react"

const Persons = ({ persons, setPersons }) => {
    const deletePerson = (person) => {
        if (window.confirm(`Delete ${person.name} ?`)) {
            personService
            .delete(person.id)
            .then(() => {
                setPersons(persons.filter(it => it.id !== person.id))
            })
        }
    }

    return (
        <> {persons.map((person) => <div key={person.id}> 
                <p key={person.id}>{person.name} {person.number}</p> 
                <Button handleClick={ (event) => { event.preventDefault(); deletePerson(person) } } label='delete' />
            </div>
        )} </>
    )
}

export default Persons