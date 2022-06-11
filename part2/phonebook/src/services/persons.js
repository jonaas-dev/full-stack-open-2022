import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject, opts) => {
  return axios.put(`${baseUrl}/${id}`, newObject, opts)
}

const deleteOne = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default { 
  getAll: getAll, 
  create: create, 
  update: update,
  delete: deleteOne
}