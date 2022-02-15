const { copyFile, newFolder } = require('../library');
const Project = require('../src/script/folders');
const data = require('../src/data/plugins.json').Chisel;
const { valor } = require('../src/script/Resource/index.lib');
const { name: addon, project } = require('../src/data/addon.json');

function BP() {
  return true;
}
function RP() {
  return true;
}

BP.Block = async (json, { sound }) => {
  const Block = data.Block;
  const BP = await require('../src/script/Behavior');
  const name = json['minecraft:block'].description.identifier;
  for (let numberBlock = 1; numberBlock <= Block.end; numberBlock++) {
    if (Block.data) {
      Block.array.forEach(async element => {
        json['minecraft:block'].description.identifier = `${name}_${element}`;
        await generateBlock(
          json['minecraft:block'].description.identifier,
          numberBlock,
          json['minecraft:block'],
          element
        );
      });
      break;
    }
    json['minecraft:block'].description.identifier = `${name}`;
    await generateBlock(
      json['minecraft:block'].description.identifier,
      numberBlock,
      json['minecraft:block']
    );
  }
  return json;
  async function generateBlock(id, numberBlock, json, type = '') {
    json.description.identifier = `${id}_${numberBlock}`;
    json.description.properties = { 'aga:stuff': ['none', 'chisel'] };

    json.components['minecraft:on_player_placing'] = { event: 'place' };
    json.components['minecraft:on_interact'] = {
      event: 'fill',
      condition: "(query.get_equipped_item_name('main_hand') == 'chisel')",
    };

    json.permutations = [
      {
        condition: "(query.block_property('aga:stuff') == 'chisel')",
        components: {
          'minecraft:ticking': {
            looping: false,
            range: [0, 0],
            on_tick: { event: 'block_chisel', target: 'self' },
          },
        },
      },
    ];

    json.events = {
      ...json.events,
      place: { set_block_property: { 'aga:stuff': 'none' } },
      fill: { set_block_property: { 'aga:stuff': "query.get_equipped_item_name('main_hand')" } },
      block_chisel: {},
    };

    if (numberBlock != Block.end)
      json.events.block_chisel = { set_block: { block_type: `${id}_${numberBlock + 1}` } };
    else json.events.block_chisel = { set_block: { block_type: `${id}_${1}` } };

    await json
      .toJson()
      .createFile(
        `${newFolder(
          `${newFolder(`./${project}/${addon}_BP/blocks/${name.split(':')[1]}`)}/${type}`
        )}/${numberBlock}.json`
      );
    BP.Recipe.Shapeless({
      result: `${id}_${numberBlock}`,
      identifier: `${id}_${numberBlock}_crafting`,
      materials: Block.origen,
    })
      .json.toJson()
      .createFile(
        `${await newFolder(
          `${await newFolder(
            `${await newFolder(`./${project}/${addon}_BP/recipes/${name.split(':')[1]}`)}/${type}`
          )}/crafting`
        )}/${numberBlock}.json`
      );
    BP.Recipe.Shapeless({
      result: Block.origen,
      identifier: `${id}_${numberBlock}_uncrafting`,
      materials: `${id}_${numberBlock}`,
    })
      .json.toJson()
      .createFile(
        `${await newFolder(
          `${await newFolder(
            `${await newFolder(`./${project}/${addon}_BP/recipes/${name.split(':')[1]}`)}/${type}`
          )}/uncrafting`
        )}/${numberBlock}.json`
      );
    Json({ sound, id, numberBlock, type, name: name.split(':')[1] });
  }
};
function Add(json) {
  return json.toJson();
}
module['exports'] = { BP, RP, Add };

let terrain_textureJson, blocksJson;
async function valorJson() {
  let { blocks, terrain_texture } = valor();
  terrain_textureJson = terrain_texture;
  blocksJson = blocks;
}

async function Json({ id, numberBlock, name, type, sound }) {
  await valorJson();
  console.log(name)

  await Project.Resource.textures.blocks();
  blocksJson[id] = {
    textures: name,
    sound: sound,
  };
  terrain_textureJson.texture_data[`${name}`] = {
    textures: `./${project}/${addon}_RP/textures/blocks/${name}/${type}/${numberBlock}.png`,
  };
  copyFile(
    './src/img/blocks/block.png',
    `${newFolder(
      `${newFolder(`./${project}/${addon}_RP/textures/blocks/${name}`)}/${type}`
    )}/${numberBlock}.png`
  );
  terrain_textureJson.toJson().createFile(`./${project}/${addon}_RP/textures/terrain_texture.json`);
  blocksJson.toJson().createFile(`./${project}/${addon}_RP/blocks.json`);
}
