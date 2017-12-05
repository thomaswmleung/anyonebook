import axios from 'axios'
import { API_BASE_URL } from './../env'
import { getUser } from './auth-service'

const TIMEOUT = 8000

export const ApiPrivateHttp = axios.create({
  baseURL: API_BASE_URL,
  timeout: TIMEOUT
})

ApiPrivateHttp.interceptors.request.use((config) => {
  config['headers'] = {
    'token': getUser().token
  }
  return config
})

ApiPrivateHttp.interceptors.response.use((response) => {
  return response.data
}, (error) => {
  return Promise.reject(error)
})

export const ApiHttp = axios.create({
  baseURL: API_BASE_URL,
  timeout: TIMEOUT
})

ApiHttp.interceptors.response.use((response) => {
  return response.data
}, (error) => {
  return Promise.reject(error)
})

export const Http = axios

Http.interceptors.request.use((config) => {
  config['headers'] = {
    'token': getUser().token
  }
  return config
})

Http.interceptors.response.use((response) => {
  return response.data
}, (error) => {
  return Promise.reject(error)
})
