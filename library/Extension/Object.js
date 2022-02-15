function type(data) {
  return toString.call(data);
}
function isArray(data) {
  return type(data) === '[object Array]';
}
function isObject(data) {
  return type(data) === '[object Object]';
}
function isIterable(data) {
  return isObject(data) || isArray(data)
}

/**
 *
 * @param {String} name
 * @param {function} func
 */
let addProperty = function (name, func) {
  Object.prototype.__defineGetter__(name, func);
};

/**
 *
 * @param {String} name
 * @param {function} func
 */
let addFunction = function (name, func) {
  Object.prototype[name] = func;
};

addProperty('log', function () {
  console.log(this);
  return this;
});
addFunction('toJson', function () {
  return JSON.stringify(this, null, 2);
});
addProperty('keys', function () {
  let returns = () => Object.keys(this);
  returns.inverse = () => {
    let obj = { ...this };
    obj.keys().forEach(element =>
      obj[element].keys().forEach(subElement => {
        obj[subElement] = obj[subElement] || {};
        obj[subElement][element] = {};
        obj[subElement][element] = obj[element][subElement];
      })
    );
    return obj;
  };
  return returns;
});
addFunction('compare', function (obj) {
  if(!isObject(obj)) throw new TypeError(`${obj} is not Object`)
  return (
    this.keys().every(name => {
      if (isIterable(this[name])) return this[name].compare(obj[name]);
      return this[name] === obj[name];
    }) &&
    obj.keys().every(name => {
      if (isIterable(obj[name])) return this[name].compare(obj[name]);
      return obj[name] === this[name];
    })
  );
});

module['exports'] = {
  addProperty,
  addFunction,
};
