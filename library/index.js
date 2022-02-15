const aga = require('./aga')
const extension = require('./extension')

module['exports'] = {
  ...aga,
  ...extension
};