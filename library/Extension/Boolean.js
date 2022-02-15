require('colors')
/**
 * @param {string} name
 * @param {function} func
 */
let addProperty = function (name, func) {
  Boolean.prototype.__defineGetter__(name, func);
};

/**
 * @param {string} name
 * @param {function} func
 */
let addFunction = function (name, func) {
  Boolean.prototype[name] = func;
};

addProperty('txt', function(){
  return this.toString().yellow
})
addProperty('log', function(){
  console.log(this)
  return this
})

module['exports'] = {
  addProperty,
  addFunction
};