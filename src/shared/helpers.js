const isJson = (candidate) => {
  let status

  try {
    JSON.parse(candidate)
    status = true
  }
  catch (e) {
    status = false
  }
  return status
}

const isEmptyObject = (obj) => {
  for (var prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false
    }
  }
  return true
}
/**
 * Function for build query params which will be appended to url.
 * @param {*} list
 */
const toQueryParams = (list) => {
  // set initial query param string
  let tmp = '?'
  // count object properties to be looped
  let size = Object.keys(list).length
  // build string within loop
  for (const prop in list) {
    // check if the prop is an array, if yes then loop through the prop
    if (Array.isArray(list[prop])) {
      let propLength = list[prop].length

      list[prop].forEach(val => {
        tmp += `${prop}[]=` + val
        propLength--

        tmp += propLength === 0 ? '' : '&'
      })
    }
    // if prop is an generic value, assign directly
    else {
      tmp += `${prop}=` + list[prop]
    }
    // decrease the amount of size
    size--
    // if the size is 0 (zero) then append empty string, else append & (ampersand) symbol
    tmp += size === 0 ? '' : '&'
  }
  // return the query params
  return tmp
}

const toFormObject = (obj) => {
  let form = new FormData()

  for (const o in obj) {
    if (Array.isArray(obj[o])) {
      obj[o].forEach(data => {
        form.append(`${o}[]`, data)
      })
    }
    else {
      form.append(o, obj[o])
    }
  }

  return form
}

const getExtension = (filename) => filename.slice((Math.max(0, filename.lastIndexOf('.')) || Infinity) + 1)

const destroyImmutable = (candidate) => JSON.parse(JSON.stringify({ ...candidate }))

export {
  isJson,
  isEmptyObject,
  toQueryParams,
  getExtension,
  toFormObject,
  destroyImmutable
}
