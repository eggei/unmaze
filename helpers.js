module.exports = class Helpers {
  constructor() {}
  // Get all the paths in the given object as strings array
  // eg. ["objA.objB.objC.field", "obj.objA.field"]
  getAllPaths(o, p) {
    const keys = Object.keys(o)
    const prefix = p ? `${p}.` : ''

    return keys.reduce((result, key) => {
      let accPath = result
      if (this.isObject(o[key])) {
        accPath = accPath.concat(this.getAllPaths(o[key], prefix + key))
      } else {
        accPath.push(prefix + key)
      }
      return accPath
    }, [])
  }

  getPathTo(field, obj) {
    // Throw error for wrong arguments
    if (!this.isObject(obj) || arguments.length !== 2) {
      throw new Error(
        `Bad arguments to "getPathTo" - Arguments passed: ${field}, ${obj}`,
      )
    }

    const paths = this.getAllPaths(obj)

    // Find the path contains given field
    const containingPath = paths.filter((path) =>
      path.split('.').includes(field),
    )[0]

    // Throw error if the path doesn't exist
    if (!containingPath) {
      throw new Error(
        `[Error occured in function "getPathTo"] >>> "${field}" <<< does not exist in object.`,
      )
    }

    // Slice the wanted part of containing path
    const sliceIndex =
      containingPath.split('.').findIndex((el) => el === field) + 1
    const result = containingPath.split('.').slice(0, sliceIndex)
    return result
  }

  getValueOf(field, obj) {
    const path = this.getPathTo(field, obj)
    const value = path.reduce((acc, key) => {
      return acc && Object.prototype.hasOwnProperty.call(acc, key)
        ? acc[key]
        : 'does not exist'
    }, obj)
    if (value === 'does not exist') {
      throw new Error(
        `[Error occured in function "getValueOf"] >>> "${field}" <<< does not exist in object.`,
      )
    } else {
      return value
    }
  }

  isObject(x) {
    return Object.prototype.toString.call(x) === '[object Object]'
  }
}
