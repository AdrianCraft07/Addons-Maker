//Librerias
const fs = require('fs'),
  aga = require('../aga'),
  vars = require('./var RP'),
  pl = require('../index').Plugin,
  imgs='../packs';
pl()
//constantes
const addon = require('../../../data/addon.json').name,
  carpetas = require('../carpetas'),
  ore = require('../../../data/ore.json');

var blocksJson = require('../../packs/blocks.json'),
  terrain_textureJson = require('../../packs/terrain_texture.json'),
  item_textureJson = require('../../packs/item_texture.json'),
  carpeta = 0;
var
  jp = '../../../'
  crp = '../../'

/*
 * Texturas de bloques
 * blocks.json y terrain_texture.json
 */
function run_blocks(id, name, sound, is_table = false, carp = null) {
  if (fs.existsSync(crp+`${addon}_RP/textures/blocks`)) {
    blocksJson = require(jp+`${addon}_RP/blocks.json`);
    terrain_textureJson = require(jp+`${addon}_RP/textures/terrain_texture.json`);
    blocks(id, name, sound, is_table, carp);
  } else {
    carpetas.blocks();
    blocks(id, name, sound, is_table, carp);
  }
}
function blocks(id, name, sound, is_table, carp) {
  if (is_table == true) {
    blocksJson[`${id}:${name}`] = {
      textures: {
        up: `${name}_top`,
        down: `${name}_botton`,
        north: `${name}_front`,
        south: `${name}_front`,
        west: `${name}_side`,
        east: `${name}_side`
      },
      sound: sound
    };
  } else {
    blocksJson[`${id}:${name}`] = {
      textures: ' ',
      sound: sound
    };
    blocksJson[`${id}:${name}`].textures = name;
  }

  let jsonBlock = JSON.stringify(blocksJson);
  fs.writeFile(`${crp}${addon}_RP/blocks.json`, jsonBlock, (error) => {
    if (error) {
      console.log(error);
    }
  });
  terrain_texture(name, is_table, carp);
}

function terrain_texture(name, is_table, carp) {
  if (carp == null) {
    if (is_table == true) {
      terrain_textureJson.texture_data[`${name}_top`] = {
        textures: `textures/blocks/${name}_top`
      };
      terrain_textureJson.texture_data[`${name}_front`] = {
        textures: `textures/blocks/${name}_front`
      };
      terrain_textureJson.texture_data[`${name}_side`] = {
        textures: `textures/blocks/${name}_side`
      };
      terrain_textureJson.texture_data[`${name}_botton`] = {
        textures: `textures/blocks/${name}_botton`
      };
    } else {
      terrain_textureJson.texture_data[`${name}`] = {
        textures: `textures/blocks/${name}`
      };
    }
  } else {
    if (is_table == true) {
      terrain_textureJson.texture_data[`${name}_top`] = {
        textures: `textures/blocks/${carp}/${name}_top`
      };
      terrain_textureJson.texture_data[`${name}_front`] = {
        textures: `textures/blocks/${carp}/${name}_front`
      };
      terrain_textureJson.texture_data[`${name}_side`] = {
        textures: `textures/blocks/${carp}/${name}_side`
      };
      terrain_textureJson.texture_data[`${name}_botton`] = {
        textures: `textures/blocks/${carp}/${name}_botton`
      };
    } else {
      terrain_textureJson.texture_data[`${name}`] = {
        textures: `textures/blocks/${carp}/${name}`
      };
    }
  }
  let jsonTerrain = JSON.stringify(terrain_textureJson);
  fs.writeFile(crp+`${addon}_RP/textures/terrain_texture.json`, jsonTerrain, (error) => {
    if (error) {
      console.log(error);
    }
  });
}

/*
 * Texturas de items
 * item_texture.json
 */
const ingot_code = /^([Ii][Nn][Gg][Oo][Tt])$/,
  armor_code = /^([Aa][Rr][Mm][Oo][Rr])$/,
  tools_code = /^([Tt][Oo][Oo][Ll])([Ss]?)$/,
  li_i = `./${addon}_RP/textures/item_texture.json`;
function run_items(name, type, id) {
  if (fs.existsSync(`./${addon}_RP/textures/items`)) {
    items(name, type, jp+`${addon}_RP/textures/item_texture.json`, id);
  } else {
    carpetas.items();
    items(name, type, '../../packs/item_texture.json', id);
  }
}
function items(name, type, link, id) {
  item_textureJson = require(link);

  if (ingot_code.test(type) == true) {
    if (carpeta == 0) {
      itemsG(name, 'ingot', '_ingot');
      textureAT(name, 'ingot');
    } else if (carpeta == 1) {
      itemsG(name, 'ingot', 'raw_');
      textureAT(name, 'raw');
    }
  } else if (armor_code.test(type) == true) {
    if (carpeta == 0) {
      itemsG(name, 'armor', '_helmet', id);
      armor('helmet', name, id);
      textureAT(name, 'helmet');
      textureA(name);
    } else if (carpeta == 1) {
      itemsG(name, 'armor', '_chestplate', id);
      armor('chestplate', name, id);
      textureAT(name, 'chestplate');
    } else if (carpeta == 2) {
      itemsG(name, 'armor', '_leggings', id);
      armor('leggins', name, id);
      textureAT(name, 'leggings');
    } else if (carpeta == 3) {
      itemsG(name, 'armor', '_boots', id);
      armor('boots', name, id);
      textureAT(name, 'boots');
    }
  } else if (tools_code.test(type) == true) {
    if (carpeta == 0) {
      itemsG(name, 'tools', '_sword');
      textureAT(name, 'sword');
    } else if (carpeta == 1) {
      itemsG(name, 'tools', '_pickaxe');
      textureAT(name, 'pickaxe');
    } else if (carpeta == 2) {
      itemsG(name, 'tools', '_axe');
      textureAT(name, 'axe');
    } else if (carpeta == 3) {
      itemsG(name, 'tools', '_shovel');
      textureAT(name, 'shovel');
    } else if (carpeta == 4) {
      itemsG(name, 'tools', '_hoe');
      textureAT(name, 'hoe');
    }
  } else if (carpeta == 0) {
    itemsG(name, 'item', '');
  }
}
function itemsG(name, type, subname, id) {
  if (subname == 'raw_') {
    item_textureJson.texture_data[`${subname + name}`] = { textures: '' };
    item_textureJson.texture_data[`${subname + name}`].textures = `textures/items/${subname + name}`;
  } else {
    item_textureJson.texture_data[`${name + subname}`] = { textures: '' };
    item_textureJson.texture_data[`${name + subname}`].textures = `textures/items/${name + subname}`;
  }
  let jsonItems = JSON.stringify(item_textureJson);
  fs.writeFile(`../../${addon}_RP/textures/item_texture.json`, jsonItems, (error) => {
    if (error) {
      console.log(error);
    } else {
      carpeta++;
      items(name, type, jp+`${addon}_RP/textures/item_texture.json`, id);
    }
  });
}
function armor(type, name, id) {
  let attaJson = vars.attachables();

  var n = 1;
  if (type == 'leggins') {
    n = 2;
    attaJson['minecraft:attachable'].description.scripts.parent_setup = 'variable.leg_layer_visible = 0.0;';
  } else if (type == 'helmet') {
    attaJson['minecraft:attachable'].description.scripts.parent_setup = 'variable.helmet_layer_visible = 0.0;';
  } else if (type == 'chestplate') {
    attaJson['minecraft:attachable'].description.scripts.parent_setup = 'variable.chestplate_layer_visible = 0.0;';
  }

  attaJson['minecraft:attachable'].description.identifier = `${id}:${name}_${type}`;
  attaJson['minecraft:attachable'].description.textures.default = `${name}_${n}`;
  attaJson['minecraft:attachable'].description.geometry.default += type;

  let jsonAtta = JSON.stringify(attaJson);
  fs.writeFile(`../../${addon}_RP/attachables/${name}_${type}.json`, jsonAtta, (error) => {
    if (error) {
      console.log(error);
    }
  });
}
function textureB(a, b) {
  fs.createReadStream(`${imgs}/img/blocks/` + a).pipe(fs.createWriteStream(`../../${addon}_RP/textures/blocks/` + b));
}
function textureTable(name) {
  textureB(`block.png`, `${name}_botton.png`);
  textureB(`crafting_top.png`, `${name}_top.png`);
  textureB(`crafting_front.png`, `${name}_front.png`);
  textureB(`crafting_side.png`, `${name}_side.png`);
}
function textureAT(name, type) {
  if (type == 'raw') {
    textureI(`${type}.png`, `${type}_${name}.png`);
  } else {
    textureI(`${type}.png`, `${name}_${type}.png`);
  }
}
function textureA(name) {
  fs.createReadStream(`${imgs}/img/armor/1.png`).pipe(fs.createWriteStream(`../../${addon}_RP/textures/models/armor/${name}_1.png`));
  fs.createReadStream(`${imgs}/img/armor/2.png`).pipe(fs.createWriteStream(`../../${addon}_RP/textures/models/armor/${name}_2.png`));
}
function textureI(a, b) {
  fs.createReadStream(`${imgs}/img/items/` + a).pipe(fs.createWriteStream(`../../${addon}_RP/textures/items/` + b));
}
module.exports = { run_blocks, run_items, textureB, textureTable };
