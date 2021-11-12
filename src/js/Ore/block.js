const rp = require('../RP/RP'),
  bp = require('../BP/BP'),
  pl = require('../index').Plugin;

const { blocks, name, id, is_ingot } = require('../../../data/ore.json'),
  { ore, block } = blocks;
var text = '';

pl('RP', 'translate', `tile.${id}:${name}_block.name`, 'blocks/block');

rp.run_blocks(id, `${name}_block`, 'metal');
rp.textureB(`block.png`, `${name}_block.png`);
text += `[RP] ${name}_block\n`;

bp.block(false, `${id}`, `${name}_block`, 'metal', 10, block.color, block.pickaxe, true);
text += `[BP] ${name}_block\n`;
if (is_ingot == true) {
  bp.crafteo(['III', 'III', 'III'], { I: { item: `${id}:${name}_ingot` } }, [{ item: `${id}:${name}_block` }], `${name}_block`);
  bp.crafteo(['I'], { I: { item: `${id}:${name}_block` } }, [{ item: `${id}:${name}_ingot` }], `ingot_${name}_from_block`);
} else {
  bp.crafteo(['III', 'III', 'III'], { I: { item: `${id}:${name}` } }, [{ item: `${id}:${name}_block` }], `${name}_block`);
  bp.crafteo(['I'], { I: { item: `${id}:${name}_block` } }, [{ item: `${id}:${name}` }], `${name}_from_block`);
}
console.log(text);
