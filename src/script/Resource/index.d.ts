/**
 * Create Texture Blocks
 */
export class Block {
  constructor(config: {
    id: String;
    name: String;
    sound: String;
    is_table: Boolean;
    folder: Boolean;
  }): String;
}
/**
 * Create Texture Items
 */
export class Item {
  constructor(config: { id: String; name: String; type: String; extend: Object }): String;
}
