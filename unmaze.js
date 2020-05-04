const poke = require('./bulbasaur')
const Helpers = require('./helpers')

function unmaze(obj) {
  return new Unmaze(obj)
}

class Unmaze extends Helpers {
  constructor(object) {
    super()
    var _internalObj = { ...object }
    this.getInternalObj = () => ({ ..._internalObj })
    this.setInternalObj = (payload) => {
      _internalObj = payload
    }
    this.path = null
    this.key = null
    this.value = null
  }

  get obj() {
    console.log('getting internal object')
    return this.getInternalObj()
  }

  get(key) {
    this.key = key
    this.value = this.getValueOf(key, this.obj)
    this.path = this.getPathTo(key, this.obj)
    return this
  }

  of(key) {
    const parent = this.getValueOf(key, this.obj)
    this.value = parent[this.key]
    this.path = [
      ...this.getPathTo(key, this.obj),
      this.path[this.path.length - 1],
    ]
    return this
  }

  in(key) {
    return this.of(key)
  }

  set set(val) {
    const { path } = this
    let pathToProp = 'this.obj';
    // accumulate path to prop as an executable string
    for (let i = 0; i < path.length; ++i) {
      pathToProp += `['${path[i]}']`
    }
    // add assignment part to the executable string
    const assignValueToProp = pathToProp + `=${JSON.stringify(val)}`
    // tell javascript to evaluate executable string
    // which is something like this.obj[key1][key2] = val
    // TODO: This should use the this.setInternalObj function instead of manipulating it directly.
    eval(assignValueToProp)
  }
}

// Initialize the object wrapped with unmaze
const o = unmaze(poke)

o.get('is_hidden').in('details').set = [1, 'ege', false, null, { success: undefined }]
console.log(o.path)
console.log(JSON.stringify(o.obj, null, 3))
console.log('new value: ____________', o.get('is_hidden').in('details').value) 