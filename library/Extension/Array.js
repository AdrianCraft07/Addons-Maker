const { isArray, isIterable } = require('../aga');

/**
 * @param {string} name
 * @param {function} func
 */
let addProperty = function (name, func) {
  Array.prototype.__defineGetter__(name, func);
};

/**
 * @param {string} name
 * @param {function} func
 */
let addFunction = function (name, func) {
  Array.prototype[name] = func;
};

addFunction('deleteIndex', function (spaces) {
  let array = [];
  if (typeof spaces === 'number') {
    this.forEach((_, i) => {
      if (spaces !== i) array.push(this[i]);
    });
  } else if (typeof spaces === 'object') {
    if (!isArray(spaces)) throw new TypeError(`"${spaces}" is not valid`)
    array = this;
    spaces.order.number().forEach((number, index) => {
      array = array.deleteIndex(number - index);
    });
  }
  return array;
});
addFunction('getData', function (spaces) {
  let array = []
  if(typeof spaces === 'number') array.push(this[spaces])
  else if (typeof spaces === 'object') {
    if (!isArray(spaces)) throw new TypeError(`"${spaces}" is not valid`);
    spaces.order.number().forEach((number) => {
      array.push(this[number])
    })
  }
  return array
})
addFunction('max', function (number) {
  let array = []
  if (typeof number === 'number')
    this.forEach((element, i) => {
      if(number >= i) array.push(element)
    })
  return array
})
addFunction('dataExists', function (data) {
  let locate = []
  this.forEach((valor, index) => {
    if(valor===data)locate.push(index)
  })
  return {valor:locate > 0, locate};
});

addProperty('order', function () {
  let number = () => {
    let array = [];
    this.forEach((e) => array.push(e));
    if (!array.every((e) => typeof e === 'number')) {
      `"${array}" is not Number[]`.error
      return array;
    }
    return array.sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
  };
  let string = () => {
    let array = [];
    this.forEach((e) => array.push(e));
    if (!array.every((e) => typeof e === 'string')) {
      `"${array}" is not String[]`.error
      return array;
    }
    return array.sort((x, y) => x.charCodeAt(0) - y.charCodeAt(0));
  };
  let This = () => {
    let array = [];
    this.forEach((e) => array.push(e));
    return array.sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
  };
  This.number = number;
  This.string = string;
  return This;
});

addProperty('log', function () {
  console.log(this);
  return this;
});
addProperty('text', function () {
  return `[ ${this.join(', ')} ]`;
});
addFunction('compare', function (arr) {
  if(!isArray(arr)) throw new TypeError(`${arr} is not Array`)
  return (
    this.every(name => {
      if (isIterable(this[name])) return this[name].compare(arr[name]);
      return this[name] === arr[name];
    }) &&
    arr.every(name => {
      if (isIterable(arr[name])) return this[name].compare(arr[name]);
      return arr[name] === this[name];
    })
  );
});

module['exports'] = {
  addProperty,
  addFunction
};
