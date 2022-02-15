/**
 * Create Blocks for Addons of Minecraft Bedrock
 */
export class Block {
  async read(config: {
    id: String;
    tag: String;
    lvl: Number;
    name: String;
    type: String;
    item?: String;
    color: String;
    folder?: String;
    plugins: Boolean;
    is_stone?: Boolean;
    is_table?: Boolean;
    destroy_time: Number;
    itemCount?: {
      min: Number;
      max: Number;
    };
    config_table?: {
      description: String;
      tags: String;
    };
  },
  callback: (json: Object, stop: Boolean) => void): String;
  json: Object;
}

/**
 * Create Items for Addons of Minecraft Bedrock
 */
export class Item {
  async read(
    config: {
      plugins: Boolean;
      stack: Number;
      id: String;
      name: String;
      config?: {
        type: String;
        armor?: {
          helmet: {
            armor: Number;
            durability: Number;
          };
          chestplate: {
            armor: Number;
            durability: Number;
          };
          leggings: {
            armor: Number;
            durability: Number;
          };
          boots: {
            armor: Number;
            durability: Number;
          };
        };
        tools?: {
          dmgSwr: Number;
          speed: Number;
          durability: Number;
          lvl: Number;
        };
      };
    },
    callback: (json: Object, stop: Boolean) => void
  ): String;
}

export class Recipe {
  constructor(config: {
    result: String;
    identifier: String;
    tags: String[];
    materials: Object;
    crafting: String[];
  }): ThisType;
  static Furnace(config: {
    result: String;
    identifier: String;
    tags: String[];
    materials: Object;
  }): String;
  static Shapeless(config: {
    result: String;
    identifier: String;
    tags: String[];
    materials: Object;
  }): String;
  static custom = {
    Tools(config: { result: String; stick: String; result: String }): String;,
    Armor(config: { result: String; result: String; material: String }): String;,
  };
}
