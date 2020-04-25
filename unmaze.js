const poke = require('./bulbasaur')
const Helpers = require('./helpers')

function unmaze(obj) {
  return new Unmaze(obj)
}

class Unmaze extends Helpers {
  constructor(obj) {
    super()
    this._obj = { ...obj }
    this._path = null
    this._key = null
    this._value = null
  }

  get value() {
    return this._value
  }

  get key() {
    return this._key
  }

  get path() {
    return this._path
  }

  get obj() {
    return this._obj
  }

  get(prop) {
    this._key = prop
    this._value = this.getValueOf(prop, this.obj)
    this._path = this.getPathTo(prop, this.obj)
    return this
  }

  of(prop) {
    const parent = this.getValueOf(prop, this.obj)
    this._value = parent[this.key]
    this._path = [
      ...this.getPathTo(prop, this.obj),
      this._path[this._path.length - 1],
    ]
    return this
  }

  in(prop) {
    return this.of(prop)
  }

  set set(val) {
    // const path = this.getPathTo(prop, this.obj)
    // let ref = this.obj
    // for (let i = 0, len = path.length; i < len; ++i) {
    //   ref = ref[path[i]]
    // }
    // return ref
    console.log('this.value', this.value)
    console.log('val', val)
    console.log('path', path)
    // CREATE THE SETTER FOR SYNTAX: o.get('something').set = 'new value'
    // for (let i; i < this._path.length; i++) {}
    // this._obj[0][1][2][3][4][5] = value
    this._value = val
  }
}

const o = unmaze(poke)
/*

o.get("url").of("move_learn_method").set("ege.com");
o.get("url") = "ege.com";
o.version_group_details.move_learn_method.url = "ege.com";

*/
// console.log(o.get('slot').in("details").path)
// console.log(o.get('slot').of('details').value)

console.log(o.get('name').in('base_experience').path)
console.log(o.get('name').in('move').value)
