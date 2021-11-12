const rp = require('../RP/RP'),
  bp = require('../BP/BP'),
  pl = require('../index').Plugin;

const { is_ingot, blocks, name, id } = require('../../../data/ore.json'),
  { ore, block } = blocks;
var text = '';

pl('RP', 'translate', `tile.${id}:deepslate_${name}_ore.name`, 'blocks/deepslate_ore');

if (is_ingot == true) {
  rp.run_blocks(id, `deepslate_${name}_ore`, 'stone', false, 'deepslate');
  rp.textureB(`deepslate/ore.png`, `deepslate/deepslate_${name}_ore.png`);
  text += `[RP] ${name}_ore\n`;

  bp.block(false, `${id}`, `deepslate_${name}_ore`, 'stone', 10, ore.color, ore.pickaxe, true, 'ore', `raw_${name}`, ore.item);
  text += `[BP] deepslate_${name}_ore\n`;
} else {
  rp.run_blocks(id, `deepslate_${name}_ore`, 'stone');
  rp.textureB(`ore.png`, `deepslate_${name}_ore.png`);
  text += `[RP] deepslate_${name}_ore\n`;

  bp.block(`${id}`, `deepslate_${name}_ore`, 'stone', 10, ore.color, ore.pickaxe, true, name, ore.item);
  text += `[BP] deepslate_${name}_ore\n`;
}
console.log(text);
