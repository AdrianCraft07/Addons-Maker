///Libraries
const Plugin = require('../plugin');
const Project = require('../folders');
const lib = require('./index.lib');
const { Speak } = require('../lib');

///JSON constant's
const addon = require('../../data/addon.json');
const ore = require('../../data/ore.json');

///JSON variables
let blocksJson;
let item_textureJson;
let terrain_textureJson;

async function valorJson() {
  let { blocks, item_texture, terrain_texture } = lib.valor();
  blocksJson = blocks;
  item_textureJson = item_texture;
  terrain_textureJson = terrain_texture;
}
class Block{
  async read({ id, name, sound, is_table, folder, extend }) {
    this.id = id || 'aga';
    this.name = name || 'material';
    this.sound = sound || 'stone';
    this.is_table = is_table || false;
    this.folder = folder || false;
    await valorJson();
    await Project.Resource.textures.blocks(this.folder ? '' : this.name);
    await lib.is_table(
      this.is_table,
      { blocksJson, terrain_textureJson },
      { id: this.id, name: this.name, sound: this.sound }
    );
    let returns = Speak({ name: 'RP', type:'Blocks', message: `${this.id}:${this.name} complete!!` });
    returns.Plugin = callback => new Plugin({ carp: 'RP', type: ['Blocks', 'Translate'], extend }, callback)
    return returns;
  }
}

class Item {
  async read({ id, name, type, extend }) {
    this.id = id || 'aga';
    this.name = name || 'material';
    this.type = type || 'item';
    extend.language = extend.language || 'item';
    await Project.Resource.textures.items();
    await valorJson();

    let texture = '';
    try {
      texture = await lib.type[type.toLowerCase()](item_textureJson, {
        id: this.id,
        name: this.name,
        type: this.type,
      });
    } catch (_) {
      texture = await lib.type.item(item_textureJson, {
        id: this.id,
        name: this.name,
        type: this.type,
      });
    }

    let returns = Speak({ name: 'RP', type: 'Items', message: `${this.id}:${this.name} complete!!` });
    returns.Plugin = callback => new Plugin({ carp: 'RP', type: ['Items', 'Translate'], extend }, callback);
    return returns;
  }
}

module['exports'] = (async () => await Plugin.Add('rp', { Block, Item }))();
