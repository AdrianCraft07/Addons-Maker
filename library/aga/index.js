const { mkdir, readdirSync, readFileSync } = require('fs');
require('../Extension/String');
require('../Extension/Object');

function or(option1, option2) {
  let value = !(option1 == undefined || option1 == NaN || option1 == null);
  return value ? option1 : option2;
}
function copyObject(object) {
  let newObject = {};
  object.keys().forEach(element => {
    if (isObject(object[element])) newObject[element] = copyObject(object[element]);
    else if (isArray(object[element])) newObject[element] = copyArray(object[element]);
    else newObject[element] = object[element];
  });
  return newObject;
}
function copyArray(array) {
  let newObject = {};
  array.forEach((_, index) => {
    if (isObject(array[index])) newObject[index] = copyObject(array[index]);
    else if (isArray(array[index])) newObject[index] = copyArray(array[index]);
    else newObject[index] = array[index];
  });
  return newObject;
}
function input(data, { Default, mark }) {
  let input = require('prompt-sync')();
  let text = data;
  if (!!Default) text = `${text} (${Default})`;
  if (!!mark) text = `${text}${mark[0]}`;
  return input(`${text} `);
}
function newFolder(route) {
  if (!exists(route)) {
    mkdir(route, err => {
      if (err) throw new Error(`newFolder did not work in ${route}`)
    });
  }
  return route;
}
function exists(path) {
  let exist = false;
  let data = {};
  try {
    data = readdirSync(path);
    exist = true;
  } catch (e) {
    try {
      data = readFileSync(path).toString();
      exist = true;
    } catch (error) {
      exist = false;
    }
  }
  return exist;
}
async function copyFile(copy, paste) {
  let data;
  let err;
  try {
    err = copy;
    data = await readFileSync(copy).toString();

    err = paste;
    data.createFile(paste);
  } catch (error) {
    error.log
  }
  return data;
}
async function dir(route = './', callback) {
  if (exists(route)) {
    let files = readdirSync(route);
    return await array(files, async file => await callback(file, files));
  } else throw new Error(`"${route}" is invalid`);
}
async function array(array, callback) {
  let newArray = [];
  for (let i = 0; i < array.length; i++) {
    let res = await callback(array[i]);
    if (!!res) newArray.push(res);
  }
  return newArray;
}
function type(data) {
  return toString.call(data);
}
function isArray(data) {
  return type(data) === '[object Array]';
}
function isObject(data) {
  return type(data) === '[object Object]';
}
function isBoolean(data) {
  return type(data) === '[object Boolean]';
}
function isString(data) {
  return type(data) === '[object String]';
}
function isNumber(data) {
  return type(data) === '[object Number]';
}
function isIterable(data) {
  return isObject(data) || isArray(data)
}
function generateUUID() {
  let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (count) {
    let Time = new Date().getTime();
    let random = (Time + Math.random() * 16) % 16 | 0;
    return (count === 'x' ? random : (random & 0x3) | 0x8).toString(16);
  });
  return uuid;
}
async function newExtension({ path, extension }, callback) {
  return await dir(path, async file => {
    if (file.endsWith(extension)) {
      return (await callback({ name: file.split(extension)[0], file })) || file;
    }
  });
}
function requireJson(path) {
  let data;
  const file = readFileSync;
  if(!exists(path))throw new Error(`file ${path} not exist`)
  if (path.endsWith('.json')) data = file(path);
  else if (path.endsWith('/')) data = file(`${path}index.json`);
  else data = file(`${path}.json`);
  return data.toString().toObject();
}
const readFile = readFileSync;

module['exports'] = {
  input,
  newFolder,
  copyFile,
  dir,
  array,
  type,
  isArray,
  isObject,
  isBoolean,
  isString,
  isNumber,
  isIterable,
  generateUUID,
  newExtension,
  requireJson,
  readFile,
  copyObject,
  copyArray,
  or,
};
