const rp = require('../RP/RP'),
  bp = require('../BP/BP'),
  pl = require('../index').Plugin;

const { is_ingot, blocks, name, id } = require('../../../data/ore.json'),
  { ore, block } = blocks;
var text = '';

pl('RP', 'translate', `tile.${id}:${name}_ore.name`, 'blocks/ore');

if (is_ingot == true) {
  rp.run_blocks(id, `${name}_ore`, 'stone');
  rp.textureB(`ore.png`, `${name}_ore.png`);
  text += `[RP] ${name}_ore\n`;

  bp.block(false, `${id}`, `${name}_ore`, 'stone', 10, ore.color, ore.pickaxe, true, 'ore', `raw_${name}`, ore.item);
  text += `[BP] ${name}_ore\n`;

} else {
  rp.run_blocks(id, `${name}_ore`, 'stone');
  rp.textureB(`ore.png`, `${name}_ore.png`);
  text += `[RP] ${name}_ore\n`;

  bp.block(`${id}`, `${name}_ore`, 'stone', 10, ore.color, ore.pickaxe, true, name, ore.item);
  text += `[BP] ${name}_ore\n`;
}

bp.Feature(id, name, ore.feature.y.min, ore.feature.y.max, ore.feature.ores, ore.feature.iterations);
console.log(text);
