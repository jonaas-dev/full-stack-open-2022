require('dotenv').config()
const express = require('express')
var morgan = require('morgan')

const Person = require('./models/person')

const app = express()
app.use(express.json())
app.use(express.static('build'))

morgan.token('id', (request) => request.id)
morgan.token('body', (request) => JSON.stringify(request.body))

app.use(morgan(':id :method :url :status :res[content-length] :response-time ms :body'))

app.get('/', function (req, response) {
  response.send('hello, world!')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.use(express.json())

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  }).catch(error => {
    next(error)
  })
})

app.get('/api/info', (request, response) => {
  /* global persons */
  let template = '<div>'
  template += ('<div>Phonebook has infor for '+ persons.length +' people</div>')
  template += (''+ new Date())
  template += '</div>'

  response.send(template)
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedAndFormattedPerson => {
      response.json(savedAndFormattedPerson)
    }).catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const personData = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, personData, { new: true, runValidators: true })
    .then(updatedPerson => {
      console.log(updatedPerson)
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

/* global process */
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})