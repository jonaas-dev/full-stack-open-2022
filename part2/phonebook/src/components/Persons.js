import Button from './Button'
import personService from '../services/persons'

const Persons = ({ persons, setPersons, setNotificationData }) => {
  const emptyNotification = { type: null, message: null }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .delete(person.id)
        .then(() => {
          setNotificationData({
            type : 'success',
            message : `Deleted ${person.name}`
          })
          setTimeout(() => {
            setNotificationData(emptyNotification)
          }, 5000)

          setPersons(persons.filter(it => it.id !== person.id))
        })
        .catch(() => {
          setNotificationData({
            type : 'error',
            message : `Imformation of '${person.name}' has already been removed from server`
          })
          setTimeout(() => {
            setNotificationData(emptyNotification)
          }, 5000)
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
  }

  return (
    <> {persons.map((person) => <div key={person.id}>
      <p key={person.id}>{person.name} {person.number}</p>
      <Button handleClick={ (event) => { event.preventDefault(); deletePerson(person) } } label='delete' /></div>)}
    </>
  )
}

export default Persons