import axios from 'axios'

// For development purposes.
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Function to add the Bearer token to headers for each request
const setAuthHeader = () => {
  const token = sessionStorage.getItem('token')
  if (token) {
    apiClient.defaults.headers['Authorization'] = `Bearer ${token}`
  }
}

const get = (url: string) => {
  setAuthHeader()
  return apiClient.get(url)
}

const post = (url: string, data: object) => {
  setAuthHeader()
  return apiClient.post(url, data)
}

// This should only be used for the login and signup pages.
const nonAuthPost = (url: string, data: object) => {
  return apiClient.post(url, data)
}

const put = (url: string, data: object) => {
  setAuthHeader()
  return apiClient.put(url, data)
}

const deleteRequest = (url: string) => {
  setAuthHeader()
  return apiClient.delete(url)
}

export { get, post, put, deleteRequest, nonAuthPost }
