require('../../../../library');
class CreateDigger {
  constructor({ type, speed, lvl }) {
    if (lvl === 0) this.lvl = 0;
    else this.lvl = lvl || 1;
    let pickaxeDig = pickaxe(speed, this.lvl);
    let diggers = {
      sword: [
        { block: 'minecraft:bamboo', speed },
        { block: 'minecraft:web', speed },
      ],
      axe: [],
      hoe: [
        { block: 'minecraft:nether_wart_block', speed },
        { block: 'minecraft:warped_wart_block', speed },
        { block: 'minecraft:hay_block', speed },
        { block: 'minecraft:leaves2', speed },
        { block: 'minecraft:leaves', speed },
      ],
      shovel: [],
      pickaxe: [...pickaxeDig],
    };
    diggers.full = [
      ...diggers.axe,
      ...diggers.hoe,
      ...diggers.pickaxe,
      ...diggers.shovel,
      ...diggers.sword,
    ];

    let tags = {
      hoe: '',
      sword: '',
      axe: "'wood', 'pumpkin', 'plant'",
      shovel: "'dirt', 'sand', 'gravel', 'grass', 'snow'",
      pickaxe: ["'bedrock'", "'stone'", "'metal'", "'obsidian'"],
    };
    let component = {
      use_efficiency: false,
      destroy_speeds: [
        { block: { tags: `q.any_tag(${tag(this.lvl, type, tags)})` }, speed },
        ...diggers[type],
      ],
      on_dig: {
        event: 'dmg',
      },
    };
    return component;
  }
}
function tag(lvl, type, tags) {
  if (type === 'pickaxe')
    if (lvl <= 0) return tags[type][0];
    else {
      if (lvl == 2 || lvl == 3)
        return tags[type]
          .max(lvl - 1)
          .deleteIndex(0)
          .join(', ');
      return tags[type].max(lvl).deleteIndex(0).join(', ');
    }
  else {
    return tags[type];
  }
}

function pickaxe(speed, lvl) {
  let wood = [
    { block: 'minecraft:cracked_polished_blackstone_bricks', speed },
    { block: 'minecraft:polished_blackstone_pressure_plate', speed },
    { block: 'minecraft:polished_blackstone_bricks_stairs', speed },
    { block: 'minecraft:polished_blackstone_bricks_wall', speed },
    { block: 'minecraft:polished_blackstone_bricks_slab', speed },
    { block: 'minecraft:polished_deepslate_double_slab', speed },
    { block: 'minecraft:heavy_weighted_pressure_plate', speed },
    { block: 'minecraft:light_weighted_pressure_plate', speed },
    { block: 'minecraft:cobbled_deepslate_double_slab', speed },
    { block: 'minecraft:light_blue_glazed_terracotta', speed },
    { block: 'minecraft:chiseled_polished_blackstone', speed },
    { block: 'minecraft:smooth_red_sandstone_stairs', speed },
    { block: 'minecraft:deepslate_brick_double_slab', speed },
    { block: 'minecraft:deepslate_tile_double_slab', speed },
    { block: 'minecraft:polished_blackstone_bricks', speed },
    { block: 'minecraft:polished_blackstone_stairs', speed },
    { block: 'minecraft:polished_blackstone_button', speed },
    { block: 'minecraft:polished_deepslate_stairs', speed },
    { block: 'minecraft:magenta_glazed_terracotta', speed },
    { block: 'minecraft:orange_glazed_terracotta', speed },
    { block: 'minecraft:purple_glazed_terracotta', speed },
    { block: 'minecraft:silver_glazed_terracotta', speed },
    { block: 'minecraft:yellow_glazed_terracotta', speed },
    { block: 'minecraft:cracked_deepslate_bricks', speed },
    { block: 'minecraft:cobbled_deepslate_stairs', speed },
    { block: 'minecraft:mossy_stone_brick_stairs', speed },
    { block: 'minecraft:polished_blackstone_wall', speed },
    { block: 'minecraft:prismarine_bricks_stairs', speed },
    { block: 'minecraft:polished_andesite_stairs', speed },
    { block: 'minecraft:polished_blackstone_slab', speed },
    { block: 'minecraft:polished_deepslate_slab', speed },
    { block: 'minecraft:polished_deepslate_wall', speed },
    { block: 'minecraft:polished_diorite_stairs', speed },
    { block: 'minecraft:polished_granite_stairs', speed },
    { block: 'minecraft:smooth_sandstone_stairs', speed },
    { block: 'minecraft:cracked_deepslate_tiles', speed },
    { block: 'minecraft:white_glazed_terracotta', speed },
    { block: 'minecraft:black_glazed_terracotta', speed },
    { block: 'minecraft:brown_glazed_terracotta', speed },
    { block: 'minecraft:green_glazed_terracotta', speed },
    { block: 'minecraft:cobbled_deepslate_slab', speed },
    { block: 'minecraft:cobbled_deepslate_wall', speed },
    { block: 'minecraft:blue_glazed_terracotta', speed },
    { block: 'minecraft:cyan_glazed_terracotta', speed },
    { block: 'minecraft:gray_glazed_terracotta', speed },
    { block: 'minecraft:lime_glazed_terracotta', speed },
    { block: 'minecraft:pink_glazed_terracotta', speed },
    { block: 'minecraft:dark_prismarine_stairs', speed },
    { block: 'minecraft:red_glazed_terracotta', speed },
    { block: 'minecraft:deepslate_brick_stair', speed },
    { block: 'minecraft:stained_hardened_clay', speed },
    { block: 'minecraft:cracked_nether_bricks', speed },
    { block: 'minecraft:deepslate_brick_slab', speed },
    { block: 'minecraft:deepslate_brick_wall', speed },
    { block: 'minecraft:deepslate_tile_stair', speed },
    { block: 'minecraft:red_sandstone_stairs', speed },
    { block: 'minecraft:stone_pressure_plate', speed },
    { block: 'minecraft:nether_bricks_fence', speed },
    { block: 'minecraft:polished_blackstone', speed },
    { block: 'minecraft:deepslate_tile_wall', speed },
    { block: 'minecraft:deepslate_tile_slab', speed },
    { block: 'minecraft:medium_amethyst_bud', speed },
    { block: 'minecraft:polished_deepslate', speed },
    { block: 'minecraft:chiseled_deepslate', speed },
    { block: 'minecraft:deepslate_coal_ore', speed },
    { block: 'minecraft:infested_deepslate', speed },
    { block: 'minecraft:large_amethyst_bud', speed },
    { block: 'minecraft:small_amethyst_bud', speed },
    { block: 'minecraft:stone_brick_stairs', speed },
    { block: 'minecraft:pointed_dripstone', speed },
    { block: 'minecraft:brick_block_stair', speed },
    { block: 'minecraft:cobbled_deepslate', speed },
    { block: 'minecraft:prismarine_stairs', speed },
    { block: 'minecraft:deepslate_bricks', speed },
    { block: 'minecraft:enchanting_table', speed },
    { block: 'minecraft:end_brick_stairs', speed },
    { block: 'minecraft:amethyst_cluster', speed },
    { block: 'minecraft:budding_amethyst', speed },
    { block: 'minecraft:sandstone_stairs', speed },
    { block: 'minecraft:dripstone_block', speed },
    { block: 'minecraft:redstone_block', speed },
    { block: 'minecraft:deepslate_tiles', speed },
    { block: 'minecraft:blackstone_wall', speed },
    { block: 'minecraft:blackstone_wall', speed },
    { block: 'minecraft:nether_gold_ore', speed },
    { block: 'minecraft:polished_basalt', speed },
    { block: 'minecraft:amethyst_block', speed },
    { block: 'minecraft:crimson_nylium', speed },
    { block: 'minecraft:red_sandstone', speed },
    { block: 'minecraft:redstone_lamp', speed },
    { block: 'minecraft:hardened_clay', speed },
    { block: 'minecraft:brewing_stand', speed },
    { block: 'minecraft:warped_nylium', speed },
    { block: 'minecraft:blast_furnace', speed },
    { block: 'minecraft:quartz_stairs', speed },
    { block: 'minecraft:quartz_bricks', speed },
    { block: 'minecraft:quartz_stairs', speed },
    { block: 'minecraft:purpur_stairs', speed },
    { block: 'minecraft:quartz_block', speed },
    { block: 'minecraft:soul_lantern', speed },
    { block: 'minecraft:nether_brick', speed },
    { block: 'minecraft:purpur_block', speed },
    { block: 'minecraft:smooth_stone', speed },
    { block: 'minecraft:stone_button', speed },
    { block: 'minecraft:brick_block', speed },
    { block: 'minecraft:frosted_ice', speed },
    { block: 'minecraft:lit_furnace', speed },
    { block: 'minecraft:stone_slab2', speed },
    { block: 'minecraft:stone_slab3', speed },
    { block: 'minecraft:stone_slab4', speed },
    { block: 'minecraft:mob_spawner', speed },
    { block: 'minecraft:magma_block', speed },
    { block: 'minecraft:ender_chest', speed },
    { block: 'minecraft:prismarine', speed },
    { block: 'minecraft:end_bricks', speed },
    { block: 'minecraft:grindstone', speed },
    { block: 'minecraft:stonebrick', speed },
    { block: 'minecraft:blackstone', speed },
    { block: 'minecraft:quartz_ore', speed },
    { block: 'minecraft:netherrack', speed },
    { block: 'minecraft:bone_block', speed },
    { block: 'minecraft:stone_slab', speed },
    { block: 'minecraft:packed_ice', speed },
    { block: 'minecraft:sealantern', speed },
    { block: 'minecraft:deepslate', speed },
    { block: 'minecraft:sandstone', speed },
    { block: 'minecraft:end_stone', speed },
    { block: 'minecraft:glowstone', speed },
    { block: 'minecraft:blue_ice', speed },
    { block: 'minecraft:cauldron', speed },
    { block: 'minecraft:observer', speed },
    { block: 'minecraft:concrete', speed },
    { block: 'minecraft:coal_ore', speed },
    { block: 'minecraft:furnace', speed },
    { block: 'minecraft:lantern', speed },
    { block: 'minecraft:calcite', speed },
    { block: 'minecraft:end_rod', speed },
    { block: 'minecraft:basalt', speed },
    { block: 'minecraft:smoker', speed },
    { block: 'minecraft:anvil', speed },
    { block: 'minecraft:chain', speed },
    { block: 'minecraft:tuff', speed },
    { block: 'minecraft:ice', speed },
  ];
  let stone = [
    { block: 'minecraft:waxed_weathered_cut_copper_stairs', speed },
    { block: 'minecraft:waxed_oxidized_cut_copper_stairs', speed },
    { block: 'minecraft:waxed_weathered_cut_copper_slab', speed },
    { block: 'minecraft:waxed_exposed_cut_copper_stairs', speed },
    { block: 'minecraft:waxed_oxidized_cut_copper_slab', speed },
    { block: 'minecraft:waxed_oxidized_cut_copper_slab', speed },
    { block: 'minecraft:waxed_exposed_cut_copper_slab', speed },
    { block: 'minecraft:weathered_cut_copper_stairs', speed },
    { block: 'minecraft:oxidized_cut_copper_stairs', speed },
    { block: 'minecraft:waxed_weathered_cut_copper', speed },
    { block: 'minecraft:weathered_cut_copper_slab', speed },
    { block: 'minecraft:exposed_cut_copper_stairs', speed },
    { block: 'minecraft:waxed_oxidized_cut_copper', speed },
    { block: 'minecraft:waxed_exposed_cut_copper', speed },
    { block: 'minecraft:oxidized_cut_copper_slab', speed },
    { block: 'minecraft:oxidized_cut_copper_slab', speed },
    { block: 'minecraft:waxed_cut_copper_stairs', speed },
    { block: 'minecraft:exposed_cut_copper_slab', speed },
    { block: 'minecraft:waxed_weathered_copper', speed },
    { block: 'minecraft:waxed_oxidized_copper', speed },
    { block: 'minecraft:waxed_cut_copper_slab', speed },
    { block: 'minecraft:waxed_exposed_copper', speed },
    { block: 'minecraft:weathered_cut_copper', speed },
    { block: 'minecraft:deepslate_copper_ore', speed },
    { block: 'minecraft:oxidized_cut_copper', speed },
    { block: 'minecraft:deepslate_lapis_ore', speed },
    { block: 'minecraft:exposed_cut_copper', speed },
    { block: 'minecraft:deepslate_iron_ore', speed },
    { block: 'minecraft:cut_copper_stairs', speed },
    { block: 'minecraft:weathered_copper', speed },
    { block: 'minecraft:waxed_cut_copper', speed },
    { block: 'minecraft:oxidized_copper', speed },
    { block: 'minecraft:cut_copper_slab', speed },
    { block: 'minecraft:exposed_copper', speed },
    { block: 'minecraft:lightning_rod', speed },
    { block: 'minecraft:waxed_copper', speed },
    { block: 'minecraft:lapis_block', speed },
    { block: 'minecraft:copper_ore', speed },
    { block: 'minecraft:cut_copper', speed },
    { block: 'minecraft:lapis_ore', speed },
    { block: 'minecraft:iron_ore', speed },
    { block: 'minecraft:copper', speed },
  ];
  let iron = [
    { block: 'minecraft:deepslate_redstone_ore', speed },
    { block: 'minecraft:deepslate_diamond_ore', speed },
    { block: 'minecraft:deepslate_emerald_ore', speed },
    { block: 'minecraft:deepslate_gold_ore', speed },
    { block: 'minecraft:diamond_block', speed },
    { block: 'minecraft:emerald_block', speed },
    { block: 'minecraft:redstone_ore', speed },
    { block: 'minecraft:diamond_ore', speed },
    { block: 'minecraft:emerald_ore', speed },
    { block: 'minecraft:gold_ore', speed },
  ];
  let diamond = [
    { block: 'minecraft:crying_obsidian', speed },
    { block: 'minecraft:netherite_block', speed },
    { block: 'minecraft:respawn_anchor', speed },
    { block: 'minecraft:ancient_debris', speed },
    { block: 'minecraft:obsidian', speed },
  ];
  stone = [...wood, ...stone];
  iron = [...stone, ...iron];
  diamond = [...iron, ...diamond];
  let digger = [[], wood, stone, iron, diamond];
  let dig;
  if (lvl >= 4) dig = digger[4];
  else if (lvl <= 0) dig = digger[0];
  else dig = digger[lvl];
  return dig;
}

module['exports'] = {
  CreateDigger,
};
