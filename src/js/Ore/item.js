const rp = require('../RP/RP'),
  bp = require('../BP/BP'),
  pl = require('../index').Plugin;

const { is_ingot, name, id, blocks } = require('../../../data/ore.json'),
  { ore, block } = blocks;
var text = '';

/*
 ? Es lingote, Si la respuesta es si se crearan el lingote y el item crudo ademas de crafteos y el bloque de el material crudo
*/
if (is_ingot == true) {
  rp.run_items(name, 'ingot');
  text += `[RP] ${name} [items]\n║ ${name}_ingot\n╚ raw_${name}\n\n`;

  rp.run_blocks(id, `${name}_block`, 'metal');

  bp.items(false, id, name, 'ingot');
  text += `[BP] ${name} [items]\n║ ${name}_ingot\n╚ raw_${name}\n\n`;

  rp.textureB(`raw_block.png`, `raw_${name}_block.png`);
  text += `[RP] raw_${name}_block\n`;

  bp.block(false,`${id}`, `raw_${name}_block`, 'metal', 10, block.color, block.pickaxe, true, `raw_${name}_block`);
  text += `[BP] raw_${name}_block\n`;

  bp.crafteo([], `${id}:raw_${name}`, `${id}:${name}_ingot`, `${name}_ingot`, 'furnace', ['furnace', 'blast_furnace']);
  bp.crafteo(
    ['III', 'III', 'III'],
    { I: { item: `${id}:raw_${name}` } },
    [{ item: `${id}:raw_${name}_block` }],
    `raw_${name}_block`
  );
  bp.crafteo(['I'], { I: { item: `${id}:raw_${name}_block` } }, [{ item: `raw_${id}:${name}` }], `raw_${name}_from_block`);

  pl('RP', 'translate', `item.${id}:raw_${name}.name`, 'items/raw');
  pl('RP', 'translate', `item.${id}:${name}_ingot.name`, 'items/ingot');
  pl('RP', 'translate', `tile.${id}:raw_${name}_block.name`, 'blocks/raw');
} else {
  rp.run_items(name, 'item');
  text += `[RP] ${name} [items]\n`;

  bp.items(false, id, name, 'item');
  text += `[BP] ${name} [items]\n`;

  bp.crafteo([], `${id}:${name}_ore`, `${id}:${name}_ingot`, `${name}_ingot`, 'furnace', ['furnace', 'blast_furnace']);
  bp.crafteo([], `${id}:deepslate_${name}_ore`, `${id}:${name}_ingot`, `${name}_ingot`, 'furnace', ['furnace', 'blast_furnace']);

  pl('RP', 'translate', `item.${id}:${name}.name`);
}

console.log(text);
