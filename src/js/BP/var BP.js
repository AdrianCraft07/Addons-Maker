const fs = require('fs'),
  aga = require('../aga');

const block = require('../../../data/block.json'),
  addon = require('../../../data/addon.json').name;

function Bloque() {
  this.tag = `tag:${block.tag}`;
  this.componente = {
    'minecraft:destroy_time': block.destroy_time,
    'minecraft:map_color': block.color
  };
  this.stone = {
    components: {
      'minecraft:loot': 'loot_tables/empty.json',
      'minecraft:on_player_destroyed': {
        condition: '',
        event: 'drop_loot',
        target: 'self'
      }
    },
    events: {
      drop_loot: {
        spawn_loot: {
          table: ''
        }
      }
    }
  };
  this.blocks = {
    format_version: '1.16.0',
    'minecraft:block': {
      description: {},
      components: {}
    }
  };
}
function Crafteo(crafteo, ingredientes, resultado, name, type, tags) {
  let craft;
  if (type == 'furnace') {
    if (tags == null) {
      tags = 'furnace';
    }
    craft = {
      format_version: '1.12',
      'minecraft:recipe_furnace': {
        description: {
          identifier: name
        },
        tags: tags,
        input: ingredientes,
        output: resultado
      }
    };
  } else {
    if (tags == null) {
      tags = 'crafting_table';
    }
    craft = {
      format_version: '1.16.100',
      'minecraft:recipe_shaped': {
        description: {
          identifier: name
        },
        tags: tags,
        pattern: crafteo,
        key: ingredientes,
        result: resultado
      }
    };
  }
  return JSON.stringify(craft);
}
function Loot(id, item, itemC) {
  if (item == false) {
    return;
  } else {
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
                    min: itemC.min,
                    max: itemC.max
                  }
                }
              ]
            }
          ]
        }
      ]
    };
    fs.writeFile(`../../${addon}_BP/loot_tables/blocks/${item}.json`, JSON.stringify(loot), (error) => {
      if (error) {
        console.log(error);
      }
    });
    return;
  }
}
function Feature(id = 'aga', name = 'default', Y_min = -60, Y_max = 64, ore = 8, iterations = 10) {
  let feature_rules = {
    format_version: '1.16.0',
    'minecraft:feature_rules': {
      description: {
        identifier: `${name}_feature_rules`,
        places_feature: `${name}_features`
      },
      conditions: {
        placement_pass: 'underground_pass',
        'minecraft:biome_filter': [
          {
            any_of: [
              {
                test: 'has_biome_tag',
                operator: '==',
                value: 'overworld'
              },
              {
                test: 'has_biome_tag',
                operator: '==',
                value: 'overworld_generation'
              }
            ]
          }
        ]
      },
      distribution: {
        iterations: iterations,
        coordinate_eval_order: 'zyx',
        x: {
          distribution: 'uniform',
          extent: [0, 16]
        },
        y: {
          distribution: 'uniform',
          extent: [Y_min, Y_max]
        },
        z: {
          distribution: 'uniform',
          extent: [0, 16]
        }
      }
    }
  };
  let features = {
    format_version: '1.13.0',
    'minecraft:ore_feature': {
      description: {
        identifier: `${name}_features`
      },
      count: ore,
      replace_rules: [
        {
          places_block: `${id}:${name}`,
          may_replace: [
            {
              name: 'minecraft:stone'
            }
          ]
        },
        {
          places_block: `${id}:deepslate_${name}`,
          may_replace: [
            {
              name: 'minecraft:deepslate'
            }
          ]
        }
      ]
    }
  };
  return [features, feature_rules]
}
function Tools() {
  this.tool = {
    components: {
      'minecraft:max_stack_size': 1,
      'minecraft:hand_equipped': true,
      'minecraft:durability': {
        max_durability: 0
      },
      'minecraft:mining_speed': 1,
      'minecraft:damage': 0,
      'minecraft:weapon': {
        on_hurt_entity: {
          event: 'dmg'
        },
        on_not_hurt_entity: {
          event: 'dmg'
        },
        on_hit_block: {
          event: 'dmg'
        }
      }
    },
    events: {
      dmg: {
        damage: {
          type: 'none',
          amount: 1,
          target: 'self'
        }
      }
    }
  };
}
function Armor() {
  this.armor = {
    format_version: '1.16.100',
    'minecraft:item': {
      description: {
        identifier: ''
      },
      components: {
        'minecraft:max_stack_size': 1,
        'minecraft:enchantable': {
          value: 15,
          slot: 'armor_'
        },
        'minecraft:durability': {
          max_durability: 0
        },
        'minecraft:armor': {
          protection: 0
        },
        'minecraft:icon': {
          texture: ''
        },
        'minecraft:wearable': {
          slot: 'slot.armor.'
        },
        'minecraft:creative_category': {
          parent: 'itemGroup.name.'
        }
      }
    }
  };
  this.reinicio = ['armor_', 'slot.armor.'];
}

function Items() {
  this.item = {
    format_version: '1.16.100',
    'minecraft:item': {
      description: {
        identifier: ''
      },
      components: {},
      events: {}
    }
  };
}

function axe(speed) {
  this.component = {
    use_efficiency: true,
    destroy_speeds: [
      {
        block: {
          tags: "q.any_tag('wood', 'pumpkin', 'plant')"
        },
        speed: speed,
        on_dig: {
          event: 'dmg'
        }
      }
    ],
    on_dig: {
      event: 'dmg'
    }
  };
  return this.component;
}
function pickaxe(speed, lvl) {
  let tagW = [{ block: { tags: "q.any_tag('stone')" }, speed: speed, on_dig: { event: 'dmg' } }],
    tagB = [{ block: { tags: "q.any_tag('bedrock')" }, speed: speed, on_dig: { event: 'dmg' } }],
    tagI = [{ block: { tags: "q.any_tag('stone', 'metal')" }, speed: speed, on_dig: { event: 'dmg' } }],
    tagD = [{ block: { tags: "q.any_tag('stone', 'metal', 'obsidian')" }, speed: speed, on_dig: { event: 'dmg' } }],
    wood = [
      { block: 'minecraft:cracked_polished_blackstone_bricks', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:polished_blackstone_pressure_plate', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:polished_blackstone_bricks_stairs', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:polished_blackstone_bricks_wall', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:polished_blackstone_bricks_slab', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:polished_deepslate_double_slab', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:heavy_weighted_pressure_plate', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:light_weighted_pressure_plate', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:cobbled_deepslate_double_slab', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:light_blue_glazed_terracotta', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:chiseled_polished_blackstone', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:smooth_red_sandstone_stairs', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:deepslate_brick_double_slab', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:deepslate_tile_double_slab', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:polished_blackstone_bricks', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:polished_blackstone_stairs', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:polished_blackstone_button', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:polished_deepslate_stairs', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:magenta_glazed_terracotta', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:orange_glazed_terracotta', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:purple_glazed_terracotta', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:silver_glazed_terracotta', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:yellow_glazed_terracotta', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:cracked_deepslate_bricks', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:cobbled_deepslate_stairs', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:mossy_stone_brick_stairs', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:polished_blackstone_wall', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:prismarine_bricks_stairs', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:polished_andesite_stairs', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:polished_blackstone_slab', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:polished_deepslate_slab', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:polished_deepslate_wall', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:polished_diorite_stairs', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:polished_granite_stairs', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:smooth_sandstone_stairs', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:cracked_deepslate_tiles', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:white_glazed_terracotta', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:black_glazed_terracotta', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:brown_glazed_terracotta', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:green_glazed_terracotta', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:cobbled_deepslate_slab', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:cobbled_deepslate_wall', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:blue_glazed_terracotta', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:cyan_glazed_terracotta', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:gray_glazed_terracotta', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:lime_glazed_terracotta', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:pink_glazed_terracotta', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:dark_prismarine_stairs', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:red_glazed_terracotta', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:deepslate_brick_stair', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:stained_hardened_clay', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:cracked_nether_bricks', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:deepslate_brick_slab', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:deepslate_brick_wall', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:deepslate_tile_stair', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:red_sandstone_stairs', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:stone_pressure_plate', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:nether_bricks_fence', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:polished_blackstone', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:deepslate_tile_wall', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:deepslate_tile_slab', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:medium_amethyst_bud', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:polished_deepslate', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:chiseled_deepslate', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:deepslate_coal_ore', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:infested_deepslate', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:large_amethyst_bud', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:small_amethyst_bud', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:stone_brick_stairs', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:pointed_dripstone', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:brick_block_stair', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:cobbled_deepslate', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:prismarine_stairs', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:deepslate_bricks', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:enchanting_table', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:end_brick_stairs', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:amethyst_cluster', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:budding_amethyst', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:sandstone_stairs', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:dripstone_block', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:redstone_block', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:deepslate_tiles', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:blackstone_wall', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:blackstone_wall', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:nether_gold_ore', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:polished_basalt', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:amethyst_block', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:crimson_nylium', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:red_sandstone', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:redstone_lamp', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:hardened_clay', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:brewing_stand', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:warped_nylium', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:blast_furnace', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:quartz_stairs', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:quartz_bricks', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:quartz_stairs', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:purpur_stairs', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:quartz_block', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:soul_lantern', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:nether_brick', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:purpur_block', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:smooth_stone', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:stone_button', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:brick_block', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:frosted_ice', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:lit_furnace', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:stone_slab2', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:stone_slab3', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:stone_slab4', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:mob_spawner', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:magma_block', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:ender_chest', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:prismarine', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:end_bricks', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:grindstone', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:stonebrick', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:blackstone', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:quartz_ore', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:netherrack', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:bone_block', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:stone_slab', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:packed_ice', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:sealantern', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:deepslate', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:sandstone', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:end_stone', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:glowstone', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:blue_ice', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:cauldron', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:observer', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:concrete', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:coal_ore', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:furnace', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:lantern', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:calcite', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:end_rod', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:basalt', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:smoker', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:anvil', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:chain', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:tuff', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:ice', speed: speed, on_dig: { event: 'dmg' } }
    ],
    stone = [
      { block: 'minecraft:waxed_weathered_cut_copper_stairs', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:waxed_oxidized_cut_copper_stairs', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:waxed_weathered_cut_copper_slab', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:waxed_exposed_cut_copper_stairs', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:waxed_oxidized_cut_copper_slab', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:waxed_oxidized_cut_copper_slab', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:waxed_exposed_cut_copper_slab', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:weathered_cut_copper_stairs', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:oxidized_cut_copper_stairs', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:waxed_weathered_cut_copper', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:weathered_cut_copper_slab', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:exposed_cut_copper_stairs', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:waxed_oxidized_cut_copper', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:waxed_exposed_cut_copper', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:oxidized_cut_copper_slab', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:oxidized_cut_copper_slab', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:waxed_cut_copper_stairs', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:exposed_cut_copper_slab', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:waxed_weathered_copper', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:waxed_oxidized_copper', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:waxed_cut_copper_slab', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:waxed_exposed_copper', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:weathered_cut_copper', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:deepslate_copper_ore', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:oxidized_cut_copper', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:deepslate_lapis_ore', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:exposed_cut_copper', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:deepslate_iron_ore', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:cut_copper_stairs', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:weathered_copper', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:waxed_cut_copper', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:oxidized_copper', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:cut_copper_slab', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:exposed_copper', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:lightning_rod', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:waxed_copper', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:lapis_block', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:copper_ore', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:cut_copper', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:lapis_ore', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:iron_ore', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:copper', speed: speed, on_dig: { event: 'dmg' } }
    ],
    iron = [
      { block: 'minecraft:deepslate_redstone_ore', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:deepslate_diamond_ore', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:deepslate_emerald_ore', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:deepslate_gold_ore', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:diamond_block', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:emerald_block', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:redstone_ore', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:diamond_ore', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:emerald_ore', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:gold_ore', speed: speed, on_dig: { event: 'dmg' } }
    ],
    diamond = [
      { block: 'minecraft:crying_obsidian', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:netherite_block', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:respawn_anchor', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:ancient_debris', speed: speed, on_dig: { event: 'dmg' } },
      { block: 'minecraft:obsidian', speed: speed, on_dig: { event: 'dmg' } }
    ];

  wood = aga.BDig(wood, tagW);
  stone = aga.BDig(stone, wood);
  iron = aga.BDig(iron, stone);

  diamond = aga.BDig(diamond, iron);
  if(lvl==3)iron[0] = tagI[0];
  if(lvl>=4)diamond[0] = tagD[0];
  const dig = [tagB, wood, stone, iron, diamond];

  if(lvl>4)dig[lvl]=diamond
  this.component = {
    use_efficiency: true,
    destroy_speeds: dig[lvl],
    on_dig: {
      event: 'dmg'
    }
  };
  return this.component;
}
function hoe(speed) {
  this.component = {
    use_efficiency: true,
    destroy_speeds: [
      {
        block: 'minecraft:nether_wart_block',
        speed: speed,
        on_dig: {
          event: 'dmg'
        }
      },
      {
        block: 'minecraft:hay_block',
        speed: speed,
        on_dig: {
          event: 'dmg'
        }
      },
      {
        block: 'minecraft:leaves',
        speed: speed,
        on_dig: {
          event: 'dmg'
        }
      },
      {
        block: 'minecraft:leaves2',
        speed: speed,
        on_dig: {
          event: 'dmg'
        }
      },
      {
        block: 'minecraft:warped_wart_block',
        speed: speed,
        on_dig: {
          event: 'dmg'
        }
      }
    ],
    on_dig: {
      event: 'dmg'
    }
  };
  return this.component;
}
function shovel(speed) {
  this.component = {
    use_efficiency: true,
    destroy_speeds: [
      {
        block: {
          tags: "q.any_tag('dirt', 'sand', 'gravel', 'grass', 'snow')"
        },
        speed: speed,
        on_dig: {
          event: 'dmg'
        }
      }
    ],
    on_dig: {
      event: 'dmg'
    }
  };
  return this.component;
}
function sword(speed) {
  this.component = {
    use_efficiency: false,
    destroy_speeds: [
      {
        block: 'minecraft:web',
        speed: speed,
        on_dig: {
          event: 'dmg'
        }
      },
      {
        block: 'minecraft:bamboo',
        speed: speed,
        on_dig: {
          event: 'dmg'
        }
      }
    ],
    on_dig: {
      event: 'dmg'
    }
  };
  return this.component;
}
module.exports = { Armor, Bloque, Tools, Items, Loot, Feature, Crafteo, axe, pickaxe, hoe, shovel, sword };
