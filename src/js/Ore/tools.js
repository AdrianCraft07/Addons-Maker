const rp = require('../RP/RP'),
  bp = require('../BP/BP'),
  pl = require('../index').Plugin;

const { tools, name, id, is_ingot } = require('../../../data/ore.json'),
      { durability, dmg_sword, speed, pickaxe_lvl } = tools
var text = ''

rp.run_items( name, 'tools');
text += `[RP] ${name} [tools]\n║ ${name}_sword\n║ ${name}_pickaxe\n║ ${name}_axe\n║ ${name}_shovel\n╚ ${name}_hoe\n\n`;

text += `[BP] ${name} [tools]\n║ ${name}_sword\n║ ${name}_pickaxe\n║ ${name}_axe\n║ ${name}_shovel\n╚ ${name}_hoe\n\n`;
bp.tools(id, name, durability, speed, dmg_sword, 'axe');
bp.tools(id, name, durability, speed, dmg_sword, 'hoe');
bp.tools(id, name, durability, speed, dmg_sword, 'sword');
bp.tools(id, name, durability, speed, dmg_sword, 'shovel');
bp.tools(id, name, durability, speed, dmg_sword, 'pickaxe', pickaxe_lvl);

pl('RP', 'translate', `item.${id}:${name}_axe.name`, 'tools/axe');
pl('RP', 'translate', `item.${id}:${name}_hoe.name`, 'tools/hoe');
pl('RP', 'translate', `item.${id}:${name}_sword.name`, 'tools/sword');
pl('RP', 'translate', `item.${id}:${name}_shovel.name`, 'tools/shovel');
pl('RP', 'translate', `item.${id}:${name}_pickaxe.name`, 'tools/pickaxe');

if(is_ingot == true){
  bp.crafteo([ 'II ', 'IP ', ' P ' ], {I: {item: `${id}:${name}_ingot`}, P: {item: 'minecraft:stick'}}, [{item: `${id}:${name}_axe`}], `${name}_axe`)
  bp.crafteo([ 'II ', ' P ', ' P ' ], {I: {item: `${id}:${name}_ingot`}, P: {item: 'minecraft:stick'}}, [{item: `${id}:${name}_hoe`}], `${name}_hoe`)
  bp.crafteo([ 'I'  ,  'I' ,  'P'  ], {I: {item: `${id}:${name}_ingot`}, P: {item: 'minecraft:stick'}}, [{item: `${id}:${name}_sword`}], `${name}_sword`)
  bp.crafteo([ 'I'  ,  'P' ,  'P'  ], {I: {item: `${id}:${name}_ingot`}, P: {item: 'minecraft:stick'}}, [{item: `${id}:${name}_shovel`}], `${name}_shovel`)
  bp.crafteo([ 'III', ' P ', ' P ' ], {I: {item: `${id}:${name}_ingot`}, P: {item: 'minecraft:stick'}}, [{item: `${id}:${name}_pickaxe`}], `${name}_pickaxe`)
}else{
  bp.crafteo([ 'II ', 'IP ', ' P ' ], {I: {item: `${id}:${name}`}, P: {item: 'minecraft:stick'}}, [{item: `${id}:${name}_axe`}], `${name}_axe`)
  bp.crafteo([ 'II ', ' P ', ' P ' ], {I: {item: `${id}:${name}`}, P: {item: 'minecraft:stick'}}, [{item: `${id}:${name}_hoe`}], `${name}_hoe`)
  bp.crafteo([ 'I'  ,  'I' ,  'P'  ], {I: {item: `${id}:${name}`}, P: {item: 'minecraft:stick'}}, [{item: `${id}:${name}_sword`}], `${name}_sword`)
  bp.crafteo([ 'I'  ,  'P' ,  'P'  ], {I: {item: `${id}:${name}`}, P: {item: 'minecraft:stick'}}, [{item: `${id}:${name}_shovel`}], `${name}_shovel`)
  bp.crafteo([ 'III', ' P ', ' P ' ], {I: {item: `${id}:${name}`}, P: {item: 'minecraft:stick'}}, [{item: `${id}:${name}_pickaxe`}], `${name}_pickaxe`)
}

console.log(text)
/*
{
  "format_version": "1.12",
  "minecraft:recipe_furnace": {
    "description": {
    "identifier": "minecraft:furnace_stripped_spruce_wood"
    },

    "tags": ["furnace"],
    "input": "minecraft:wood:9",
    "output": "minecraft:coal:1"
  }
}
*/