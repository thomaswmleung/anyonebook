import { toQueryParams } from '../shared/helpers'

// define main url to the API end point
const API_BASE_URL = 'http://35.194.128.55/public'

// create function for build url base on payload or query params
const MEDIA = (mid = '') => {
  const type = typeof mid

  switch (type) {
    case 'string':
      return mid === '' ? `${API_BASE_URL}/media` : `${API_BASE_URL}/media/${mid}`
    case 'object':
      return `${API_BASE_URL}/media${toQueryParams(mid)}`
  }
}

const LOGIN = () => {
  return `${API_BASE_URL}/login`
}

const USER = (uid = null) => {
  return uid === '' ? `${API_BASE_URL}/user` : `${API_BASE_URL}/user/${uid}`
}

const REGISTER = () => {
  return `${API_BASE_URL}/register`
}

const BOOK = (bid = '') => {
  const type = typeof bid

  switch (type) {
    case 'string':
      return bid === '' ? `${API_BASE_URL}/book` : `${API_BASE_URL}/book/${bid}`
    case 'object':
      return `${API_BASE_URL}/book${toQueryParams(bid)}`
  }
}

// I remove the break line because it needed after return value in switch.
const PAGE_GROUP = (params = '') => {
  const type = typeof params

  switch (type) {
    case 'object':
      return `${API_BASE_URL}/page_group${toQueryParams(params)}`
    case 'string':
      return params === '' ? `${API_BASE_URL}/page_group` : `${API_BASE_URL}/page_group/${params}`
  }
}

const KEYWORD = (id = '') => {
  return id === '' ? `${API_BASE_URL}/keyword` : `${API_BASE_URL}/keyword/${id}`
}

const RESOURCE = () => {
  return `${API_BASE_URL}/resource`
}

// I remove the break line because it needed after return value in switch.
const PAGE = (params = '') => {
  const type = typeof params

  switch (type) {
    case 'object':
      return `${API_BASE_URL}/page${toQueryParams(params)}`
    default:
      return `${API_BASE_URL}/page?pid=${params}`
  }
}

const PARTICULAR = (params = '') => {
  return params === '' ? `${API_BASE_URL}/particular` : `${API_BASE_URL}/particular${toQueryParams(params)}`
}

// aliasn from organization
const ORGZ = {
  paginator: {
    skip: 0,
    limit: 10
  }
}

const DEBUG = true

export {
  API_BASE_URL,
  MEDIA,
  LOGIN,
  USER,
  DEBUG,
  REGISTER,
  BOOK,
  PAGE_GROUP,
  KEYWORD,
  RESOURCE,
  ORGZ,
  PAGE,
  PARTICULAR
  // Media endpoint
}
