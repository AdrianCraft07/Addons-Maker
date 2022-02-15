/**
 * @param {string} name
 * @param {function} func
 */
 let addProperty = function (name, func) {
  Function.prototype.__defineGetter__(name, func);
};

/**
 * @param {string} name
 * @param {function} func
 */
let addFunction = function (name, func) {
  Function.prototype[name] = func;
};

addFunction('watch', function () {
  return this.toString()
})

module['exports'] = {
  addProperty,
  addFunction
};