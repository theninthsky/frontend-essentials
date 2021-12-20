import camelCase from 'lodash/camelCase'

const camelCasedKeys = (obj: any): any => {
  if (Array.isArray(obj)) return obj.map(val => camelCasedKeys(val))
  if (obj && obj.constructor === Object) {
    return Object.keys(obj).reduce((acc, key) => ({ ...acc, [camelCase(key)]: camelCasedKeys(obj[key]) }), {})
  }

  return obj
}

export default camelCasedKeys
