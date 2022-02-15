require('../lib');

async function createDigger({ type, speed, lvl }) {
  const util = require('./util/tools.js');
  const digger = await new util.CreateDigger({ type, speed, lvl });
  return { ...digger };
}

module['exports'] = {
  createDigger,
};
