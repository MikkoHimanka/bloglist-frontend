import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const create = async blog => {
  const config = { headers: { Authorization: token }}
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

export default { getAll, setToken, create }