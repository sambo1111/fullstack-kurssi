import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const save = async (blog) => {
  const config = {
    headers: {
      'Authorization': token
    } 
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: {
      'Authorization': token
    }
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const update = (newObject) => {
  const config = {
    headers: {
      'Authorization': token
    }
  }
  return axios.put(`${baseUrl}/${newObject._id}`, newObject, config)
}

export default { getAll, setToken, save, remove, update}