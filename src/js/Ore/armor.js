const rp = require('../RP/RP'),
  bp = require('../BP/BP'),
  pl = require('../index').Plugin;

const { armor, name, id, is_ingot } = require('../../../data/ore.json'),
      { protection, durability } = armor
var text = '';

rp.run_items( name, 'armor', id);
text += `[RP] ${name} [armor]\n║ ${name}_helmet\n║ ${name}_chestplate\n║ ${name}_leggins\n╚ ${name}_boots\n\n`;

bp.armor(id, name, durability, protection);
text += `[BP] ${name} [armor]\n║ ${name}_helmet\n║ ${name}_chestplate\n║ ${name}_leggins\n╚ ${name}_boots\n\n`;

pl('RP', 'translate', `item.${id}:${name}_helmet.name`, 'armor/helmet');
pl('RP', 'translate', `item.${id}:${name}_chestplate.name`, 'armor/chestplate');
pl('RP', 'translate', `item.${id}:${name}_leggins.name`, 'armor/leggins');
pl('RP', 'translate', `item.${id}:${name}_boots.name`, 'armor/boots');

if(is_ingot == true){
  bp.crafteo([        'III', 'I I' ], {I: {item: `${id}:${name}_ingot`}}, [{item: `${id}:${name}_helmet`}], `${name}_helmet`)
  bp.crafteo([ 'I I', 'III', 'III' ], {I: {item: `${id}:${name}_ingot`}}, [{item: `${id}:${name}_chestplate`}], `${name}_chestplate`)
  bp.crafteo([ 'III', 'I I', 'I I' ], {I: {item: `${id}:${name}_ingot`}}, [{item: `${id}:${name}_leggings`}], `${name}_leggings`)
  bp.crafteo([        'I I', 'I I' ], {I: {item: `${id}:${name}_ingot`}}, [{item: `${id}:${name}_boots`}], `${name}_boots`)
}else{
  bp.crafteo([        'III', 'I I' ], {I: {item: `${id}:${name}`}}, [{item: `${id}:${name}_helmet`}], `${name}_helmet`)
  bp.crafteo([ 'I I', 'III', 'III' ], {I: {item: `${id}:${name}`}}, [{item: `${id}:${name}_chestplate`}], `${name}_chestplate`)
  bp.crafteo([ 'III', 'I I', 'I I' ], {I: {item: `${id}:${name}`}}, [{item: `${id}:${name}_leggings`}], `${name}_leggings`)
  bp.crafteo([        'I I', 'I I' ], {I: {item: `${id}:${name}`}}, [{item: `${id}:${name}_boots`}], `${name}_boots`)
}
console.log(text)