const rp = require('../RP/RP'),
  bp = require('../BP/BP'),
  pl = require('../index').Plugin;

const { id, name, sound, destroy_time, is_stone, is_table, tag_table } = require('../../../data/block.json'),
  data = require('../../../data/block.json');
var text = '';

//El rp.run_blocks es para crear la textura
//Se acomoda como ( id, nombre, sonido, es_mesa, subcarpeta(como deepslate))
//Por defecto viene ( id, name, sound)
text += `[RP] ${name}\n`;
rp.run_blocks(true, id, name, sound);

//El rp.textureB es para crear la textura
//Se acomoda como ( bloque1.png, bloque2.png)
//Por defecto viene ( 'block.png', `${name}.png`)
rp.textureB(`block.png`, `${name}.png`);

pl('RP', 'translate', `tile.${id}:${name}.name`, 'blocks/chisel');

//El bp.block es para crear el comportamiento
//Se acomoda como ( id, name, tag, tiempo_de_destruccion, color(hexadecimal), nivel_de_pico, es_piedra, tipo, si_es_piedra_que_suelta, minimo_y_maximo_de_lo_anterior, es_mesa, tag_de_la_mesa)
//Por defecto viene (`${id}`, `${name}`, block.tag, destroy_time, block.color, block.pickaxe_lvl, is_stone, 'Construction', null, { min: 1, max: 1 }, is_table, tag_table)

text += `[BP] ${name}\n`;
bp.block(
  true,
  `${id}`,
  name,
  data.tag,
  destroy_time,
  data.color,
  data.pickaxe_lvl,
  is_stone,
  'Construction',
  null,
  { min: 1, max: 1 },
  is_table,
  tag_table
);

bp.crafteo(data.crafting.craft, data.crafting.materials, [{ item: `${id}:${name}` }], name);

console.log(text);
