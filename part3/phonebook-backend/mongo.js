const mongoose = require('mongoose')

/* global process */
if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3] || null
const number = process.argv[4] || null

const url =
  `mongodb+srv://jonas-atlas:${password}@cluster0.v9wyedv.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)


if(name && number) {
  /** Create case */
  const person = new Person({
    name: name,
    number: number
  })

  person.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
  })
}
else
{
  /** List case */
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(person.name, ' ', person.number)
    })
    mongoose.connection.close()
  })
}


