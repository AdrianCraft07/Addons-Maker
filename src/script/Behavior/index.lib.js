const { copyObject } = require('../../../library');
const { project, name } = require('./../../data/addon.json');
const vars = require('./index.vars');

function valor() {
  let block;
  let item;

  block = {
    blocks: {
      format_version: '1.16.0',
      'minecraft:block': {
        description: {},
        components: {},
      },
    },
    component: {
      'minecraft:destroy_time': '',
      'minecraft:map_color': '',
    },
    stone: {
      components: {
        'minecraft:loot': 'loot_tables/empty.json',
        'minecraft:on_player_destroyed': {
          condition: '',
          event: 'drop_loot',
          target: 'self',
        },
      },
      events: {
        drop_loot: {
          table: '',
        },
      },
    },
  };
  item = {
    items: {
      format_version: '1.16.100',
      'minecraft:item': {
        description: {
          identifier: '',
        },
        components: {},
        events: {},
      },
    },
    armor: {
      components: {
        'minecraft:max_stack_size': 1,
        'minecraft:enchantable': {
          value: 15,
          slot: 'armor_',
        },
        'minecraft:durability': {
          max_durability: 0,
        },
        'minecraft:armor': {
          protection: 0,
        },
        'minecraft:icon': {
          texture: '',
        },
        'minecraft:wearable': {
          slot: 'slot.armor.',
        },
        'minecraft:creative_category': {
          parent: 'itemGroup.name.',
        },
      },
    },
    tool: {
      components: {
        'minecraft:hand_equipped': true,
        'minecraft:durability': {
          max_durability: 0,
        },
        'minecraft:mining_speed': 1,
        'minecraft:damage': 0,
        'minecraft:weapon': {
          on_hurt_entity: {
            event: 'dmg',
          },
          on_not_hurt_entity: {
            event: 'dmg',
          },
          on_hit_block: {
            event: 'dmg',
          },
        },
      },
      events: {
        dmg: {
          damage: {
            type: 'none',
            amount: 1,
            target: 'self',
          },
        },
      },
    },
    components: {
      'minecraft:max_stack_size': 1,
      'minecraft:icon': {
        texture: '',
      },
      'minecraft:creative_category': {
        parent: 'itemGroup.name.',
      },
    },
  };
  return { block, item };
}

function loot(id, item, itemCount) {
  let loot = {
    rolls: 1,
    pools: [
      {
        entries: [
          {
            type: 'item',
            name: `${id}:${item}`,
            weight: 1,
            functions: [
              {
                function: 'set_count',
                count: {
                  min: itemCount.min,
                  max: itemCount.max,
                },
              },
            ],
          },
        ],
      },
    ],
  };
  loot.toJson().createFile(`./${project}/${name}_BP/loot_tables/blocks/${item}.json`);
}
class ArmorJson {
  constructor(config) {
    let armor = copyObject(valor().item.items) ;
    armor['minecraft:item'].components = copyObject(valor().item.armor.components) ;

    let helmet = config => {
      let json = copyObject(armor);
      json['minecraft:item'].components['minecraft:creative_category'].parent =
        'itemGroup.name.helmet';
      json['minecraft:item'].components['minecraft:wearable'].slot = 'slot.armor.head';
      json['minecraft:item'].components['minecraft:enchantable'].slot = 'armor_head';

      json['minecraft:item'].components['minecraft:durability'].max_durability =
        config.durability || 816;
      json['minecraft:item'].components['minecraft:armor'].protection = config.armor || 4;
      return json;
    };

    let chestplate = config => {
      let json = copyObject(armor);
      json['minecraft:item'].components['minecraft:creative_category'].parent =
        'itemGroup.name.chestplate';
      json['minecraft:item'].components['minecraft:wearable'].slot = 'slot.armor.chest';
      json['minecraft:item'].components['minecraft:enchantable'].slot = 'armor_torso';

      json['minecraft:item'].components['minecraft:durability'].max_durability =
        config.durability || 1108;
      json['minecraft:item'].components['minecraft:armor'].protection = config.armor || 6;
      return json;
    };

    let leggings = config => {
      let json = copyObject(armor);
      json['minecraft:item'].components['minecraft:creative_category'].parent =
        'itemGroup.name.leggings';
      json['minecraft:item'].components['minecraft:wearable'].slot = 'slot.armor.legs';
      json['minecraft:item'].components['minecraft:enchantable'].slot = 'armor_legs';

      json['minecraft:item'].components['minecraft:durability'].max_durability =
        config.durability || 1108;
      json['minecraft:item'].components['minecraft:armor'].protection = config.armor || 5;
      return json;
    };

    let boots = config => {
      let json = copyObject(armor);
      json['minecraft:item'].components['minecraft:creative_category'].parent =
        'itemGroup.name.boots';
      json['minecraft:item'].components['minecraft:wearable'].slot = 'slot.armor.feet';
      json['minecraft:item'].components['minecraft:enchantable'].slot = 'armor_feet';

      json['minecraft:item'].components['minecraft:durability'].max_durability =
        config.durability || 960;
      json['minecraft:item'].components['minecraft:armor'].protection = config.armor || 3;
      return json;
    };

    let obj = { helmet, chestplate, leggings, boots };

    return type => obj[type](config[type]);
  }
}

async function ToolsJson({ dmgSwr, speed, durability, lvl }) {
  let tools = copyObject(valor().item.items);
  tools['minecraft:item'].components = copyObject(valor().item.tool.components);
  tools['minecraft:item'].events = copyObject(valor().item.tool.events);

  let damage = tool => {
    function dmg() {
      if (tool === 'shovel') return dmgSwr - 3;
      else if (tool === 'pickaxe' || tool === 'hoe') return dmgSwr - 2;
      else if (tool === 'axe') return dmgSwr - 1;
      else return dmgSwr;
    }
    let Dmg = dmg();
    if (Dmg < 1) return 1;
    else return Dmg;
  };
  return async type => {
    let json = copyObject(tools);
    json['minecraft:item'].components['minecraft:damage'] = await damage(type);
    json['minecraft:item'].components['minecraft:durability'].max_durability = durability || 520;
    json['minecraft:item'].components['minecraft:digger'] = await vars.createDigger({
      type,
      speed,
      lvl,
    });
    return copyObject(json)
  };
}
async function pickaxeTags(json, lvl) {
  if (lvl == 0) json['minecraft:item'].components[`tag:pickaxe:bedrock`] = {};
  else
    for (let i = 1; i <= lvl; i++) {
      json['minecraft:item'].components[`tag:pickaxe:${i}`] = {};
    }
  return json;
}
pickaxeTags.delete = function (json, lvl) {
  if (lvl == 0) delete json['minecraft:item'].components[`tag:pickaxe:bedrock`];
  else
    for (let i = 1; i <= lvl; i++) {
      delete json['minecraft:item'].components[`tag:pickaxe:${i}`];
    }
  return json;
};

module['exports'] = {
  valor,
  loot,
  ArmorJson,
  ToolsJson,
  pickaxeTags,
};
