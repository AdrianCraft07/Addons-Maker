const aga = require('../../../library');
const { project, name: addon } = require('../../data/addon.json');
const vars = require('./index.vars');

const folder = `../../../${project}/${addon}_RP/`;
function valor() {
  let blocks;
  let item_texture;
  let terrain_texture;

  try {
    blocks = require(`${folder}/blocks.json`);
  } catch (e) {
    try {
      blocks = require('../../json/blocks.json');
    } catch (e) {
      aga.error('blocks.json', 2);
    }
  }
  try {
    item_texture = require(`${folder}/textures/item_texture.json`);
  } catch (e) {
    try {
      item_texture = require('../../json/item_texture.json');
    } catch (e) {
      aga.error('item_texture.json', 2);
    }
  }
  try {
    terrain_texture = require(`${folder}/textures/terrain_texture.json`);
  } catch (e) {
    try {
      terrain_texture = require('../../json/terrain_texture.json');
    } catch (e) {
      aga.error('terrain_texture.json', 2);
    }
  }
  return { blocks, item_texture, terrain_texture };
}

async function is_table(isTable, { blocksJson, terrain_textureJson }, { id, name, sound }) {
  if (!aga.isBoolean(isTable)) isTable = isTable.toBoolean();
  if (isTable) {
    blocksJson[`${id}:${name}`] = {
      textures: {
        up: `${name}_top`,
        down: `${name}_bottom`,
        north: `${name}_front`,
        south: `${name}_front`,
        west: `${name}_side`,
        east: `${name}_side`,
      },
      sound: sound,
    };
    terrain_textureJson.texture_data[`${name}_top`] = {
      textures: `textures/blocks/${name}_top`,
    };
    terrain_textureJson.texture_data[`${name}_front`] = {
      textures: `textures/blocks/${name}_front`,
    };
    terrain_textureJson.texture_data[`${name}_side`] = {
      textures: `textures/blocks/${name}_side`,
    };
    terrain_textureJson.texture_data[`${name}_bottom`] = {
      textures: `textures/blocks/${name}_bottom`,
    };
    aga.copyFile(
      './src/img/blocks/crafting_top.png',
      `./${project}/${addon}_RP/textures/blocks/${name}_top.png`
    );
    aga.copyFile(
      './src/img/blocks/crafting_side.png',
      `./${project}/${addon}_RP/textures/blocks/${name}_side.png`
    );
    aga.copyFile(
      './src/img/blocks/crafting_front.png',
      `./${project}/${addon}_RP/textures/blocks/${name}_front.png`
    );
    aga.copyFile(
      './src/img/blocks/block.png',
      `./${project}/${addon}_RP/textures/items/${name}_bottom.png`
    );
  } else {
    blocksJson[`${id}:${name}`] = {
      textures: name,
      sound: sound,
    };
    terrain_textureJson.texture_data[`${name}`] = {
      textures: `textures/blocks/${name}`,
    };
    aga.copyFile(
      './src/img/blocks/block.png',
      `./${project}/${addon}_RP/textures/blocks/${name}.png`
    );
  }
  blocksJson.toJson().createFile(`./${project}/${addon}_RP/blocks.json`);
  terrain_textureJson.toJson().createFile(`./${project}/${addon}_RP/textures/terrain_texture.json`);
  return 'ready!!';
}
const type = {
  ingot: async function (json0, { id, name, type }) {
    let json1 = await items(json0, { name, subname: 'ingot' });
    await items(json1, { name, subname: 'raw', event: 'fin' });
    return 'ready!!';
  },
  armor: async function (json0, { id, name, type }) {
    let RP = require('../folders').Project.Resource;
    RP.textures.models.armor();
    RP.attachables();

    let json1 = await items(json0, { name, subname: 'helmet' });
    let json2 = await items(json1, { name, subname: 'chestplate' });
    let json3 = await items(json2, { name, subname: 'leggings' });
    await items(json3, { event: 'fin', name, subname: 'boots' });
    await armor({ type: 'helmet', name, id });
    await armor({ type: 'chestplate', name, id });
    await armor({ type: 'leggings', name, id });
    await armor({ type: 'boots', name, id });
    return 'ready!!';
  },
  tools: async function (json0, { id, name, type }) {
    let json1 = await items(json0, { name, subname: 'sword' });
    let json2 = await items(json1, { name, subname: 'pickaxe' });
    let json3 = await items(json2, { name, subname: 'axe' });
    let json4 = await items(json3, { name, subname: 'shovel' });
    await items(json4, { name, subname: 'hoe', event: 'fin' });
    return 'ready!!';
  },
  item: async function (json, { id, name, type }) {
    await items(json, { name, subname: 'item', event: 'fin' });
    return 'ready!!';
  },
};
async function items(json, { name, subname, event }) {
  let Name = `${name}_${subname}`;
  if (subname === 'raw') Name = `${subname}_${name}`;
  if (subname === 'item') Name = name;

  json.texture_data[Name] = { textures: `textures/items/${Name}` };
  aga.copyFile(
    `./src/img/items/${subname}.png`,
    `./${project}/${addon}_RP/textures/items/${Name}.png`
  );
  if (event === 'fin')
    json.toJson().createFile(`./${project}/${addon}_RP/textures/item_texture.json`);
  return json;
}
async function armor({ type, name, id }) {
  let attaJson = vars.attachable();

  let n = 1;
  if (type == 'leggings') {
    n = 2;
    attaJson['minecraft:attachable'].description.scripts.parent_setup =
      'variable.leg_layer_visible = 0.0;';
  } else if (type == 'helmet') {
    attaJson['minecraft:attachable'].description.scripts.parent_setup =
      'variable.helmet_layer_visible = 0.0;';
  } else if (type == 'chestplate') {
    attaJson['minecraft:attachable'].description.scripts.parent_setup =
      'variable.chestplate_layer_visible = 0.0;';
  }

  attaJson['minecraft:attachable'].description.identifier = `${id}:${name}_${type}`;
  attaJson['minecraft:attachable'].description.textures.default = `${name}_${n}`;
  attaJson['minecraft:attachable'].description.geometry.default += type;

  aga.copyFile(
    `./src/img/armor/${n}.png`,
    `./${project}/${addon}_RP/textures/models/armor/${name}_${n}.png`
  );

  attaJson.toJson().createFile(`./${project}/${addon}_RP/attachables/${name}_${type}.json`);
}
module['exports'] = {
  type,
  is_table,
  valor,
};
