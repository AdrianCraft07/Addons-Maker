//require('../src/js/chisel')
const { input, error, dir } = require('l:/');
let STOP = false;

let array = [];
(async () => {
  await dir('./run/default', file => array.push(file.split('.js')[0]));

  while (!STOP) {
    let test = input(`Cual quieres ejecutar`, { mark: '?', Default: array.text });
    STOP = /^([Ss][Tt][Oo][Pp])?([Ee][Xx][Ii][Tt])?$/.test(test);
    try {
      await require(`./${test}.js`)();
    } catch (e) {
      if (!STOP) error(test, 1);
      console.log(e)
    }
  }
})();
