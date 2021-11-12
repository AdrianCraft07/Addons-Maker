const fs = require('fs'),
  vars = require('./var BP'),
  aga = require('../aga'),
  pl = require('../index').Plugin;

const blocks = require('../../../data/block.json'),
  pickaxe = require('../../../data/pickaxe.json'),
  addon = require('../../../data/addon.json').name,
  p = pickaxe.level;

let bloque = new vars.Bloque(),
  blockJson = bloque.blocks['minecraft:block'];
bloqueJson = bloque.blocks;

function block(
  plugins = false,
  id = 'aga',
  name = 'block',
  tag = `${name}`,
  dt = 5,
  color = '#000',
  lvl = 0,
  is_stone = false,
  type = 'Construction',
  item = null,
  itemC = { min: 1, max: 1 },
  is_table = false,
  tag_table = 'crafting_table'
) {
  if (item == null) {
    item = name;
  }
  blockJson = {};
  blockJson.description = { identifier: `${id}:${name}` };

  if (is_stone) {
    blockJson.components = bloque.stone.components;
    blockJson.events = bloque.stone.events;
    if (lvl == 0 || undefined) {
      console.log('el nivel de el pico es idefinido');
      blockJson.components['minecraft:on_player_destroyed'].condition = pickaxe[null];
    } else if (lvl == -1) blockJson.components['minecraft:on_player_destroyed'].condition = pickaxe[p[0]];
    else blockJson.components['minecraft:on_player_destroyed'].condition = pickaxe[p[lvl]];

    blockJson.events.drop_loot.spawn_loot.table = `loot_tables/blocks/${item}.json`;
    vars.Loot(id, item, itemC);
  }
  if (is_table) {
    blockJson.components['minecraft:crafting_table'] = {
      grid_size: 3,
      custom_description: 'hudScreen.tooltip.crafting',
      crafting_tags: [tag_table]
    };
  }

  blockJson.components[`tag:${tag}`] = {};
  blockJson.components['minecraft:destroy_time'] = dt;
  blockJson.components['minecraft:map_color'] = color;

  bloqueJson['minecraft:block'] = blockJson;
  if (type == 'ore') {
    blockJson.components['minecraft:creative_category'] = { group: 'itemGroup.name.ore', category: 'Nature' };
  } else {
    blockJson.components['minecraft:creative_category'] = { group: 'ItemGroup.name.Construction', category: 'Construction' };
  }
  if (plugins) {
    let plugin = new pl('BP', 'block', blockJson);
    if (plugin.stop) return;
  }

  let jsonBlock = JSON.stringify(bloqueJson);
  fs.writeFile(`../../${addon}_BP/blocks/${name}.json`, jsonBlock, (error) => {
    if (error) {
      console.log(error);
    }
  });
}

function crafteo(crafteo, ingredientes, resultado, name, type = null, tags = null) {
  fs.writeFile(
    `../../${addon}_BP/recipes/${name}.json`,
    vars.Crafteo(crafteo, ingredientes, resultado, name, type, tags),
    (error) => {
      if (error) {
        console.log(error);
      }
    }
  );
}

let item = new vars.Items(),
  itemJson = item.item;

function items(plugins = false, id, name, type) {
  if (type == 'ingot') {
    itemJson['minecraft:item'].components['minecraft:icon'] = { texture: `${name}_ingot` };
    itemJson['minecraft:item'].description.identifier = `${id}:${name}_ingot`;

    fs.writeFile(`../../${addon}_BP/items/${name}_ingot.json`, JSON.stringify(itemJson), (error) => {
      if (error) {
        console.log(error);
      } else {
        itemJson['minecraft:item'].components['minecraft:icon'] = { texture: `raw_${name}` };
        itemJson['minecraft:item'].description.identifier = `${id}:raw_${name}`;
        fs.writeFile(`../../${addon}_BP/items/raw_${name}.json`, JSON.stringify(itemJson), (error) => {
          if (error) {
            console.log(error);
          }
        });
      }
    });
  } else {
    let items = itemJson;
    items['minecraft:item'].components['minecraft:icon'] = { texture: `${name}` };
    items['minecraft:item'].description.identifier = `${id}:${name}`;
    if (plugins) {
      let plugin = new pl('BP', 'item', blockJson);
      if (plugin.stop) return;
    }

    let jsonItem = JSON.stringify(items);
    fs.writeFile(`../../${addon}_BP/items/${name}.json`, jsonItem, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }
}

let armors = new vars.Armor(),
  armorBase = armors.armor,
  armorComponent = armorBase['minecraft:item'].components;
var armorCon = 0;

function armor(id, name, durability, protection) {
  if (armorCon == 0) {
    armorF(id, name, durability, protection, 'head', 'head', 'helmet');
  } else if (armorCon == 1) {
    armorF(id, name, durability, protection, 'torso', 'chest', 'chestplate');
  } else if (armorCon == 2) {
    armorF(id, name, durability, protection, 'legs', 'legs', 'leggings');
  } else if (armorCon == 3) {
    armorF(id, name, durability, protection, 'feet', 'feet', 'boots');
  }
  function armorF(id, name, durability, protection, ench, wear, type) {
    armorComponent['minecraft:enchantable'].slot = armors.reinicio[0];
    armorComponent['minecraft:wearable'].slot = armors.reinicio[1];
    armorBase['minecraft:item'].description.identifier = `${id}:${name}_${type}`;
    armorComponent['minecraft:enchantable'].slot += ench;
    armorComponent['minecraft:wearable'].slot += wear;
    armorComponent['minecraft:icon'].texture = `${name}_${type}`;
    armorComponent['minecraft:durability'].max_durability = durability[type];
    armorComponent['minecraft:armor'].protection = protection[type];
    armorComponent['minecraft:creative_category'] = { parent: `itemGroup.name.${type}` };

    let jsonArmor = JSON.stringify(armorBase);
    fs.writeFile(`../../${addon}_BP/items/${name}_${type}.json`, jsonArmor, (error) => {
      if (error) {
        console.log(error);
      } else {
        armorCon++;
        armor(id, name, durability, protection);
      }
    });
  }
}

let tool = new vars.Tools(),
  toolAllJson = tool.tool;

function tools(id, name, durability, speed, dmg, type, lvlPick = 1) {
  aga.UnTags(itemJson['minecraft:item'].components, 'aga:pickaxe', lvlPick);
  itemJson['minecraft:item'].description.identifier = `${id}:${name}_${type}`;
  itemJson['minecraft:item'].components = toolAllJson.components;
  itemJson['minecraft:item'].events = toolAllJson.events;

  itemJson['minecraft:item'].components['minecraft:creative_category'] = { parent: `itemGroup.name.${type}` };
  itemJson['minecraft:item'].components['minecraft:digger'] = vars[type](speed);
  itemJson['minecraft:item'].components['minecraft:durability'] = { max_durability: durability };
  itemJson['minecraft:item'].components['minecraft:icon'] = { texture: `${name}_${type}` };
  itemJson['minecraft:item'].components[`tag:minecraft:is_${type}`] = {};
  if (type == 'shovel') {
    damage(dmg - 3);
  } else if (type == 'pickaxe' || 'hoe') {
    damage(dmg - 2);
  } else if (type == axe) {
    damage(dmg - 1);
  } else {
    damage();
  }
  function damage(dmg) {
    if (dmg < 1) {
      itemJson['minecraft:item'].components['minecraft:damage'] = 1;
    } else {
      itemJson['minecraft:item'].components['minecraft:damage'] = dmg;
    }
  }
  if (type == 'sword') {
    itemJson['minecraft:item'].components['minecraft:can_destroy_in_creative'] = false;
  }
  if (type == 'pickaxe') {
    itemJson['minecraft:item'].components['minecraft:digger'] = vars[type](speed, lvlPick);
    aga.Tags(itemJson['minecraft:item'].components, 'aga:pickaxe', lvlPick);
  }

  let jsonItem = JSON.stringify(itemJson);
  fs.writeFile(`../../${addon}_BP/items/${name}_${type}.json`, jsonItem, (error) => {
    if (error) {
      console.log(error);
    }
  });
}
function Feature(plugins=false, id = 'aga', name = 'default', Y_min = -60, Y_max = 64, ore = 8, iterations = 10) {
  const F = vars.Feature(id, name, Y_min, Y_max, ore, iterations);
  let feature = F[0],
    feature_rule = F[1];
  if (plugins) {
    let plugin = new pl('BP', 'feature', blockJson);
    if (plugin.stop) return;
  }
  fs.writeFile(`../../${addon}_BP/features/${name}_feaures.json`, JSON.stringify(feature), (error) => {
    if (error) {
      console.log(error);
    }
  });
  fs.writeFile(`../../${addon}_BP/feature_rules/${name}_feature_rules.json`, JSON.stringify(feature_rule), (error) => {
    if (error) {
      console.log(error);
    }
  });
}
module.exports = { Feature, block, tools, armor, items, crafteo };
