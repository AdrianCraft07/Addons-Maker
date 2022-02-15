require('colors');
/**
 * @param {string} name
 * @param {function} func
 */
let addProperty = function (name, func) {
  Number.prototype.__defineGetter__(name, func);
};

/**
 * @param {string} name
 * @param {function} func
 */
let addFunction = function (name, func) {
  Number.prototype[name] = func;
};

addProperty('txt', function () {
  return this.toString().yellow;
});
addProperty('log', function () {
  console.log(this);
  return this;
});
addFunction('round', function () {
  return Math.round(this)
})

addFunction('raised', function (raised) {
  return Math.pow(this, raised)
});
addFunction('root', function (root) {
  return this.raised(1 / root)
});

module['exports'] = {
  addProperty,
  addFunction,
};
