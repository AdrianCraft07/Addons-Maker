const BOOL = require('./Boolean')
const FUN = require('./Function')
const OBJ = require('./Object')
const STR = require('./String')
const NUM = require('./Number')
const ARR = require('./Array')

function getObjFunction(get) {
  return {
    ...getFunction(BOOL, get, 'boolean'),
    ...getFunction(FUN, get, 'function'),
    ...getFunction(OBJ, get, 'object'),
    ...getFunction(STR, get, 'string'),
    ...getFunction(NUM, get, 'number'),
    ...getFunction(ARR, get, 'array'),
  };
}
function getFunction(data, get, name) {
  let obj = {};
  obj[name] = data[get];
  return obj;
}

module['exports'] = {
  addProperty: getObjFunction('addProperty'),
  addFunction: getObjFunction('addFunction'),
}.keys.inverse();
