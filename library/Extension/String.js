require('colors');
const { readFileSync, writeFile } = require('fs');
const { info, error, warn } = require('./config.json');

/**
 * @param {string} name
 * @param {function} func
 */
let addProperty = function (name, func) {
  String.prototype.__defineGetter__(name, func);
};

/**
 * @param {string} name
 * @param {function} func
 */
let addFunction = function (name, func) {
  String.prototype[name] = func;
};


addProperty('txt', function () {
  let i = 0,
    text = '';
  while (this[i] !== undefined) {
    text += this[i];
    i++;
  }
  return text;
});

addProperty('log', function () {
  let text = this.txt;
  console.log(text);
  return text;
});
addProperty('error', function () {
  let text = this[`bg${error.background || 'Red'}`][error.color || 'white'];
  console.error(text);
  return text;
});
addProperty('warn', function () {
  let text = this[`bg${warn.background || 'BrightYellow'}`][warn.color || 'black'];
  console.warn(text);
  return text;
});
addProperty('info', function () {
  let text = this[`bg${info.background || 'BrightBlue'}`][info.color || 'white'];
  console.info(text);
  return text;
});
addProperty('notColor', function () {
  return this.replace(/(\u001b[\[][0-9]*m)/g, '');
});

addFunction('toObject', function () {
  try {
    return JSON.parse(this.txt);
  } catch (e) {
    return this;
  }
});
addFunction('toBoolean', function () {
  let regex = [
    /^([Ff][Aa][Ll][Ss][Ee])?([Nn]([Oo][Tt]?)?)?$/,
    /^([Tt][Rr][Uu][Ee])?([Yy]([Ee][Ss])?)?$/,
  ];
  if (regex[1].test(this.notColor)) return true;
  else if (regex[0].test(this.notColor)) return false;
  (`"${this}" is not compatible with toBoolean`).error
  return this;
});
addFunction('createFile', function (path = './text.txt') {
  let text = this.txt;
  writeFile(path, text, err => {
    if (err) err.log
  });
  return this;
});
addFunction('startAndEnd', function (start, end) {
  if (!!start)
    if (this.startsWith(start)) {
      if (!end) end = start;
      if (this.endsWith(end)) return true;
    }
  return false;
});
addFunction('dataExists', function (data) {
  let This = this.txt;
  let text = this.replace(data, '');
  return This !== text;
});
addFunction('replaceFull', function (replaces, sign) {
  let newText = this;
  sign = sign || '';
  if (Array.isArray(replaces))
    replaces.forEach(data => {
      if (toString.call(data) === '[object String]') {
        let preReplace = data.split(':');
        let replace = [`${sign}${preReplace[0]}${sign}`, preReplace[1]];
        newText = newText.replaceAll(replace[0], replace[1]);
      }
    });
  return newText.txt;
});
addFunction('writeFile', async function (path) {
  let data;
  try {
    data = await readFileSync(path).toString();
  } catch (error) {
    data = '';
  }
  data += this;
  data.createFile(path);
  return data;
});

module['exports'] = {
  addProperty,
  addFunction,
};
