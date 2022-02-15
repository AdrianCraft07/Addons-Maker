///Library
const aga = require('../../library');
const { newExtension, isArray, isObject, requireJson } = aga;
const { Speak } = require('./lib');

const path = './plugins/';
const active = requireJson(`${path}/active.json`) || {};

const pluginOn = require('../data/addon.json').pluginsOn;

class Plugin {
  constructor({ carp, type, json, extend }) {
    this._carp = carp || null;
    this._type = type || 'other';
    this._json = json || {};
    this._extend = extend || { language: 'Translate' };
  }
  get json() {
    return this._json;
  }
  get type() {
    return this._type;
  }
  get carp() {
    return this._carp;
  }
  get extend() {
    return this._extend;
  }
  set json(json) {
    if (isObject(json)) this._json = json;
  }
  async load(callback) {
    let returns = Speak({ name: 'Plugins', message: `complete!!`, type: this.carp });
    let array = await newExtension(
      { path, extension: '.plugin.js', route: '' },
      async ({ name, file }) => {
        if (!pluginOn) return 'plugins not active';
        if (active[file] === false) return `plugin ${name} not active`;
        if (!(active[file] === undefined || active[file] === true))
          return `plugins/active.json: plugin.${name} not is Boolean`.warn;
        const plugin = require(`../../plugins/${file}`);
        if (!plugin[this.carp]())
          return `plugins/${file}: ${this.carp}() return ${plugin[this.carp]()}`;

        const loadPlugin = async type => {
          let call, back;
          try {
            call = await plugin[this.carp][type](this.json, this.extend);
            back = await plugin[this.carp][type].Stop;
          } catch (error) {}
          call = call || this.json;
          back = back || false;
          return [call, back];
        };

        let Plugin;
        if (isArray(this.type)) {
          await this.type.forEach(async t => {
            Plugin = await loadPlugin(t);
            this.json = Plugin[0] || {};
            await callback(Plugin[0], !!Plugin[1]);
          });
        } else {
          Plugin = await loadPlugin(this.type);
          this.json = Plugin[0] || {};
          await callback(Plugin[0], !!Plugin[1]);
        }
        return this.json;
      }
    );
    for (let i = 0; i < array.length; i++) {
      if (!aga.isObject(array[i])) continue;
      returns.json = array[i];
      break;
    }

    return returns;
  }
  static async Add(folder, types) {
    await newExtension({ path, extension: `.plugin.${folder}.js` }, async ({ name, file }) => {
      if (active[`plugin.${folder}`][name] === false) return;
      const type = await require(`../../plugins/${file}`);
      types = { ...types, ...type };
      return types;
    });
    return types;
  }
}

module['exports'] = Plugin;
