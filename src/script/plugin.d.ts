/**
 * "Plugin" is the class for read plugins for this addons maker
 */
declare class Plugin {
  constructor(config: { carp: String, type: String, json: Object, extend?: String }, callback: any): String
  async load(callback: (json: Object, stop: Boolean) => void): { (): String, json: Object }
  static async Add(folder:String, types:String):Object
  
}
export = Plugin

