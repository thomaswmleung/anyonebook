import axios from 'axios'
import env from './../env'
import store from './../store/modules/auth'

let instance = axios.create({
  baseURL: env.API_BASE_URL,
})

instance.interceptors.request.use((config) => {
  config['headers'] = {
    'Authorization' : 'some random key',
    'X-Proxy-URL': env.API_BASE_URL
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

instance.interceptors.response.use(({ data }) => {
  return data
}, function (error) {
  return Promise.reject(error)
});

export default instance
