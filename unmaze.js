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
    this.setInternalObj = payload => { _internalObj = payload }
    this.path = null
    this.key = null
    this.value = null
  }

  get obj() {
    console.log('getting internal object')
    return this.getInternalObj()
  }

  // set obj(payload) {
  //   console.log('setting it')
  //   this.setInternalObj(payload)
  // }

  get(prop) {
    this.key = prop
    this.value = this.getValueOf(prop, this.obj)
    this.path = this.getPathTo(prop, this.obj)
    return this
  }

  // of(prop) {
  //   const parent = this.getValueOf(prop, this.obj)
  //   this.value = parent[this.key]
  //   this.path = [
  //     ...this.getPathTo(prop, this.obj),
  //     this.path[this.path.length - 1],
  //   ]
  //   return this
  // }

  // in(prop) {
  //   return this.of(prop)
  // }

  // set set(val) {
  //   // const path = this.getPathTo(prop, this.obj)
  //   // let ref = this.obj
  //   // for (let i = 0, len = path.length; i < len; ++i) {
  //   //   ref = ref[path[i]]
  //   // }
  //   // return ref
  //   console.log('this.value', this.value)
  //   console.log('val', val)
  //   console.log('path', path)
  //   // CREATE THE SETTER FOR SYNTAX: o.get('something').set = 'new value'
  //   // for (let i; i < this.path.length; i++) {}
  //   // this.obj[0][1][2][3][4][5] = value
  //   this.value = val
  // }
}

const o = unmaze(poke)

console.log(o.obj)
o.obj = {...o.obj, ability: 10}
console.log(o.obj)
// Want to achieve this:
// o.get('ability') = 10
// console.log(o.obj)
