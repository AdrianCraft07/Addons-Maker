'use strict';

///Libraries
const Project = require('../folders');
const lib = require('./index.lib');
const aga = require('../../../library');
const { Speak } = require('../lib');
const Plugin = require('../plugin');
///Json
const { project, name: addon } = require('../../data/addon.json');

class Item {
  async read(This, callback) {
    let returns = Speak({
      name: 'BP',
      type: 'Items',
      message: `${this.id}:${this.name} complete!!`,
    });
    returns.createFile = () => Speak({ name: 'BP', type: 'Items', message: "don't create json" });

    ///Setters
    returns.setName = name => (this.name = name);
    returns.setStack = stack => (this.stack = stack);
    returns.setType = type => (this.type = type);
    returns.setConfig = config => (this.config = config);

    ///Getters
    returns.getJson = () => this.json;

    ///Functions
    returns.load = this.load;
    return load(await this.load(This, callback));

    function load(obj) {
      obj.keys().forEach(element => {
        returns[element] = obj[element];
      });
      return returns;
    }
  }
  async This(THIS) {
    let This = THIS || {};
    this.config = this.config || This.config || {};
    this.plugins = This.plugins;
    this.stack = this.stack || This.stack || 64;
    this.id = this.id || This.id || 'aga';
    this.name = this.name || This.name || 'material';
    this.type = this.config.type || 'item';
    this.armor = this.config.armor || {};
    this.tools = this.config.tools || {};
    this.extend = aga.copyObject(This.extend || {});
  }
  async load(This, callback) {
    ///Create file for Items
    let itemsValor = lib.valor();
    let json = itemsValor.item;
    this.json = aga.copyObject(json.items);
    let item = this.json['minecraft:item'];
    await Project.Behavior.item();
    await this.This(This);

    ///type
    ///type is ingot?

    let returns = {};
    switch (this.type.toLowerCase()) {
      case 'ingot':
        ///Create ingot
        item.components['minecraft:icon'] = { texture: `${this.name}_ingot` };
        item.description.identifier = `${this.id}:${this.name}_ingot`;
        this.json.toJson().createFile(`./${project}/${addon}_BP/items/${this.name}_ingot.json`);

        ///Crete raw
        item.components['minecraft:icon'] = { texture: `raw_${this.name}` };
        item.description.identifier = `${this.id}:raw_${this.name}`;
        this.json.toJson().createFile(`./${project}/${addon}_BP/items/raw_${this.name}.json`);
        break;
      case 'armor':
        ///Create armor loader
        let load = new lib.ArmorJson(this.armor);

        ///Create helmet
        let helmet = await load('helmet');
        helmet['minecraft:item'].components['minecraft:icon'] = { texture: `${this.name}_helmet` };
        helmet['minecraft:item'].description.identifier = `${this.id}:${this.name}_helmet`;
        await helmet.createJson(`${this.name}_helmet`)('items');

        let chestplate = await load('chestplate');
        chestplate['minecraft:item'].components['minecraft:icon'] = {
          texture: `${this.name}_chestplate`,
        };
        chestplate['minecraft:item'].description.identifier = `${this.id}:${this.name}_chestplate`;
        await chestplate.createJson(`${this.name}_chestplate`)('items');

        let leggings = await load('leggings');
        leggings['minecraft:item'].components['minecraft:icon'] = {
          texture: `${this.name}_leggings`,
        };
        leggings['minecraft:item'].description.identifier = `${this.id}:${this.name}_leggings`;
        await leggings.createJson(`${this.name}_leggings`)('items');

        let boots = await load('boots');
        boots['minecraft:item'].components['minecraft:icon'] = { texture: `${this.name}_boots` };
        boots['minecraft:item'].description.identifier = `${this.id}:${this.name}_boots`;
        await boots.createJson(`${this.name}_boots`)('items');
        break;
      case 'tools':
        ///Crete function Tools
        let Tools = await lib.ToolsJson(this.tools);

        ///Crete axe
        let axe = await Tools('axe');
        axe['minecraft:item'].components['minecraft:icon'] = { texture: `${this.name}_axe` };
        axe['minecraft:item'].description.identifier = `${this.id}:${this.name}_axe`;
        axe.createJson(`${this.name}_axe`)('items');

        ///Crete sword
        let sword = await Tools('sword');
        sword['minecraft:item'].components['minecraft:icon'] = { texture: `${this.name}_sword` };
        sword['minecraft:item'].description.identifier = `${this.id}:${this.name}_sword`;
        sword.createJson(`${this.name}_sword`)('items');

        ///Crete pickaxe
        let pickaxe = await Tools('pickaxe');
        pickaxe['minecraft:item'].components['minecraft:icon'] = {
          texture: `${this.name}_pickaxe`,
        };
        pickaxe['minecraft:item'].description.identifier = `${this.id}:${this.name}_pickaxe`;

        await lib.pickaxeTags(pickaxe, this.tools.lvl); ///add tags for miner blocks
        pickaxe.createJson(`${this.name}_pickaxe`)('items');
        await lib.pickaxeTags.delete(pickaxe, this.tools.lvl); ///delete tags for miner blocks

        ///Crete shovel
        let shovel = await Tools('shovel');
        shovel['minecraft:item'].components['minecraft:icon'] = { texture: `${this.name}_shovel` };
        shovel['minecraft:item'].description.identifier = `${this.id}:${this.name}_shovel`;
        shovel.createJson(`${this.name}_shovel`)('items');

        ///Crete hoe
        let hoe = await Tools('hoe');
        hoe['minecraft:item'].components['minecraft:icon'] = { texture: `${this.name}_hoe` };
        hoe['minecraft:item'].description.identifier = `${this.id}:${this.name}_hoe`;
        hoe.createJson(`${this.name}_hoe`)('items');
        break;
      default:
        ///Crete normal item
        item.components['minecraft:icon'] = { texture: `${this.name}` };
        item.description.identifier = `${this.id}:${this.name}`;

        returns.createFile = () => this.json.createJson(this.name)('items');

        if (!this.plugins) break;
        this.json = (
          await new Plugin({
            carp: 'BP',
            type: 'Item',
            json: this.json,
            extend: { type: this.type.toLowerCase(), ...this.extend },
          }).load(callback)
        ).json;
        break;
    }
    return returns;
  }
}
class Block {
  async read(This, callback) {
    let returns = Speak({
      name: 'BP',
      type: 'Blocks',
      message: `${this.id}:${this.name} complete!!`,
    });

    returns.load = this.load;
    returns.createFile = () => this.json.createJson(this.name)('blocks');

    ///Getters
    returns.getJson = () => this.json;

    await this.load(This, callback);
    return returns;
  }
  async This(THIS) {
    let This = THIS || {};
    this.id = This.id || 'aga';
    this.tag = This.tag || 'stone';
    this.name = This.name || 'material';
    this.item = This.item || `${this.id}:${this.name}`;

    this.plugins = !!This.plugins;
    this.lvl = aga.or(This.lvl, 1);
    this.is_stone = !!This.is_stone;
    this.is_table = !!This.is_table;
    this.folder = This.folder || '';
    this.sound = This.sound || 'stone';
    this.color = This.color || '#000000';
    this.type = This.type || 'Construction';
    this.destroy_time = aga.or(This.destroy_time, 5);

    this.itemCount = This.itemCount || { min: 1, max: 1 };
    this.itemCount.min = this.itemCount.min || 1;
    this.itemCount.max = this.itemCount.max || 1;

    this.config_table = This.config_table || {};
    this.config_table.description = this.config_table.description || 'hudScreen.tooltip.crafting';
    this.config_table.tags = this.config_table.tags || ['crafting_table'];
  }
  async load(This, callback) {
    await this.This(This);

    ///Load files for blocks
    await Project.Behavior.blocks();
    const pickaxe = require('../../data/pickaxe.json');
    const pickaxeLvl = pickaxe;
    let json = lib.valor().block;
    this.json = aga.copyObject(json.blocks);
    let block = this.json['minecraft:block'];

    block.description = { identifier: `${this.id}:${this.name}` };

    ///Is stone?
    if (this.is_stone) {
      block.components = json.stone.components;
      block.events = json.stone.events;

      ///Level of pickaxe stone
      block.components['minecraft:on_player_destroyed'].condition =
        pickaxe[pickaxeLvl[this.lvl]] || pickaxe[pickaxeLvl.length - 1];

      ///Generate loot of block
      block.events.drop_loot.spawn_loot.table = `loot_table/blocks/${this.item}.json`;
      lib.loot(this.id, this.item, this.itemCount);
    }

    ///Is table?
    if (this.is_table) {
      ///Add components table
      block.components['minecraft:crafting_table'] = {
        grid_size: 3,
        custom_description: this.config_table.description,
        crafting_tags: this.config_table.tags,
      };
    }
    ///Block type?
    switch (this.type) {
      ///this.type == 'ore'
      case 'ore':
        block.components['minecraft:creative_category'] = {
          group: 'itemGroup.name.ore',
          category: 'Nature',
        };
        break;
      ///type is not defined
      default:
        block.components['minecraft:creative_category'] = {
          group: 'ItemGroup.name.Construction',
          category: 'Construction',
        };
        break;
    }
    ///Tags
    ///Tags is Array?
    if (aga.isArray(this.tag)) {
      ///Read array
      this.type.forEach(element => {
        ///Element is String ? add tag : not add tag
        if (typeof element === 'string') block.components[`tag:${element}`] = {};
      });
    } else if (typeof this.tag === 'string') block.components[`tag:${this.tag}`] = {};
    ///add more components
    block.components['minecraft:destroy_time'] = this.destroy_time;
    block.components['minecraft:map_color'] = this.color;
    if (this.plugins)
      this.json = (
        await new Plugin({
          carp: 'BP',
          type: 'Block',
          json: this.json,
          extend: { type: this.type.toLowerCase(), ...this.extend },
        }).load(callback)
      ).json;
  }
}

class Recipe {
  constructor({ result, identifier, tags, materials, crafting }) {
    this.result = result || 'minecraft:coal';

    this.crafting = crafting || ['a'];
    this.tags = tags || ['crafting_table'];
    this.identifier = identifier || this.result;
    this.materials = materials || { a: 'minecraft:coal' };
    let json = {
      format_version: '1.12.0',
      'minecraft:recipe_shaped': {
        description: {
          identifier: this.identifier,
        },
        tags: this.tags,
        pattern: this.crafting,
        key: this.materials,
        result: this.result,
      },
    };
    let returns = () => json.createJson(this.identifier.noIdSync)('recipes');
    returns.json = json;
    return returns;
  }
  static custom = {
    Tools({ material, stick, result }) {
      Project.Behavior.recipe();
      material = material || 'minecraft:coal';
      stick = stick || 'minecraft:stick';
      result = result || `aga:${material.noIdSync}_{tool}`;

      let sword = new Recipe({
        result: result.tools('sword'),
        crafting: [' x ', ' x ', ' i '],
        materials: { x: material, i: stick },
      });
      let axe = new Recipe({
        result: result.tools('axe'),
        crafting: [' xx', ' ix', ' i '],
        materials: { x: material, i: stick },
      });
      let hoe = new Recipe({
        result: result.tools('hoe'),
        crafting: [' xx', ' i ', ' i '],
        materials: { x: material, i: stick },
      });
      let shovel = new Recipe({
        result: result.tools('shovel'),
        crafting: [' x ', ' i ', ' i '],
        materials: { x: material, i: stick },
      });
      let pickaxe = new Recipe({
        result: result.tools('pickaxe'),
        crafting: ['xxx', ' i ', ' i '],
        materials: { x: material, i: stick },
      });

      let returns = { sword, axe, hoe, shovel, pickaxe };
      returns.full = () => {
        sword();
        axe();
        hoe();
        shovel();
        pickaxe();
      };
      returns.json = {
        sword: sword.json,
        axe: axe.json,
        hoe: hoe.json,
        shovel: shovel.json,
        pickaxe: pickaxe.json,
      };
      return returns;
    },
    Armor({ material, result }) {
      Project.Behavior.recipe();
      material = material || 'minecraft:coal';
      result = result || `aga:${material.noIdSync}_{tool}`;

      let helmet = new Recipe({
        result: result.tools('helmet'),
        crafting: ['xxx', 'x x', '   '],
        materials: { x: material },
      });
      let chestplate = new Recipe({
        result: result.tools('chestplate'),
        crafting: ['x x', 'xxx', 'xxx'],
        materials: { x: material },
      });
      let leggings = new Recipe({
        result: result.tools('leggings'),
        crafting: ['xxx', 'x x', 'x x'],
        materials: { x: material },
      });
      let boots = new Recipe({
        result: result.tools('boots'),
        crafting: ['xxx', 'x x', '   '],
        materials: { x: material },
      });

      let returns = { helmet, chestplate, leggings, boots };
      returns.full = () => {
        helmet();
        chestplate();
        leggings();
        boots();
      };
      returns.json = {
        helmet: helmet.json,
        chestplate: chestplate.json,
        leggings: leggings.json,
        boots: boots.json,
      };
      return returns;
    },
  };
  static Furnace({ result, identifier, tags, materials }) {
    result = result || 'minecraft:coal';
    Project.Behavior.recipe();
    let json = {
      format_version: '1.12',
      'minecraft:recipe_furnace': {
        description: {
          identifier: identifier || result,
        },
        tags: tags || ['furnace'],
        input: materials || result,
        output: result,
      },
    };

    let returns = () => json.createJson(identifier.noIdSync)('recipes');
    returns.json = json;
    return returns;
  }
  static Shapeless({ result, identifier, tags, materials }) {
    result = result || 'minecraft:coal';
    Project.Behavior.recipe();
    let json = {
      format_version: '1.12',
      'minecraft:recipe_shapeless': {
        description: {
          identifier: identifier || result,
        },
        tags: tags || ['stonecutter'],
        ingredients: materials || result,
        result: result,
      },
    };

    let returns = () => json.createJson(identifier.noIdSync)('recipes');
    returns.json = json;
    return returns;
  }
}

module['exports'] = (async () => await Plugin.Add('bp', { Block, Item, Recipe }))();
