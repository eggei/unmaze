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
    this.ofChainCount = 0
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
    ++this.ofChainCount
    const parent = this.getValueOf(key, this.obj)
    this.value = parent[this.key]
    this.path = [
      ...this.getPathTo(key, this.obj),
      ...this.path.reverse().slice(0, this.ofChainCount).reverse()
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
// TODO: Create a method that gives user the ability to use value of path and also set it.
// Something like: 
// o.get('someKey').use((val, set) => {
//    const newVal = val.map(...)     
//    set(newVal)
// })

// Initialize the object wrapped with unmaze
const o = unmaze(poke)

// Instead of 
// obj['version_group_details']['move_learn_method']['version_group']['details']['is_hidden'] = false
// Use this:
o.get('level').set = 10454545
console.log(o.path)
console.log(JSON.stringify(o.obj, null, 3))
console.log('new value: ____________', o.get('level').value) 











