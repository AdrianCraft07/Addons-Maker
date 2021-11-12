const rp = require('../RP/RP'),
  bp = require('../BP/BP');

const { armor, name, id, is_ingot } = require('../../../data/ore.json'),
      { protection, durability } = armor
var text = '';
	 
//El rp.run_items es para crear la textura
//Se acomoda como ( nombre, tipo, id)
//Por defecto viene ( name, 'armor', id )
rp.run_items( name, 'armor', id );
text += `[RP] ${name} [armor]\n║ ${name}_helmet\n║ ${name}_chestplate\n║ ${name}_leggins\n╚ ${name}_boots\n\n`;

//El bp.armor es para crear el comportamiento
//Se acomoda como ( id, nombre, durabilidad, proteccion )
//Por defecto viene ( id, name, durability, protection )
bp.armor( id, name, durability, protection );
text += `[BP] ${name} [armor]\n║ ${name}_helmet\n║ ${name}_chestplate\n║ ${name}_leggins\n╚ ${name}_boots\n\n`;


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