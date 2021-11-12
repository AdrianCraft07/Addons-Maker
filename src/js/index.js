//Librerias
const fs = require('fs');
const plugins = require('../../data/plugins.json');
console.log('Plugins: ',require(`../../data/addon.json`).pluginsOn)
function Plugin(carp = null, type, json, ext = 'Translate') {
  if (require(`../../data/addon.json`).pluginsOn) {
    fs.readdir('../../plugins', (err, files) => {
      if (err) return console.error(err);
      files.forEach((file) => {
        if (!file.endsWith('.plugin.js')) return;
        let PluginName = file.split('.')[0];
        let plugin = require('../../plugins/' + file);
        Add(file);

        this.stop;
        if (carp == 'BP')
          if (plugin.BP('')) {
            if (type == 'item')
              if (plugin.BP('item')) {
                plugin.ItemB(json);
                this.stop = plugin.Stop(type);
              }
            if (type == 'block')
              if (plugin.BP('block')) {
                plugin.BlockB(json);

                this.stop = plugin.Stop(type);
              }
            if (type == 'entity')
              if (plugin.BP('entity')) {
                plugin.EntityB(json);

                this.stop = plugin.Stop(type);
              }
            if (type == 'feature')
              if (plugin.BP('feature')) {
                plugin.FeatureB(json);

                this.stop = plugin.Stop(type);
              }
          }
        if (carp == 'RP')
          if (plugin.RP('')) {
            if (type == 'item')
              if (plugin.RP('item')) {
                plugin.ItemR();

                this.stop = plugin.Stop(type);
              }
            if (type == 'block')
              if (plugin.RP('block')) {
                plugin.BlockR(json, ext);

                this.stop = plugin.Stop(type);
              }
            if (type == 'entity')
              if (plugin.RP('entity')) {
                plugin.EntityR();

                this.stop = plugin.Stop(type);
              }
            if (type == 'translate')
              if (plugin.RP('translate')) {
                plugin.TranslateR(json, ext);

                this.stop = false;
              }
          }
        if (carp != null) return this.stop;
        if (carp != null && carp != 'RP' && carp != 'BP') console.log('La carpeta es inexistente solo pueden ser "BP" o "RP"');
      });
    });
  }
  if(carp=='On')Plugin()
}
function Add(file) {
  if (plugins[file.split('.')[0]] == undefined) {
    if (require('../../plugins/' + file).Add(plugins) == false) return;
    else
      fs.writeFile('../../data/plugins.json', require('../../plugins/' + file).Add(plugins), (error) => {
        if (error) console.error(error);
        else console.log('archivo "data/plugin.json" actualizado correctamente');
      });
  } else if (plugins[file.split('.')[0]] != undefined) {
    if (require('../../plugins/' + file).MoreAdd(plugins) == false) return;
    else
      fs.writeFile('../../data/plugins.json', require('../../plugins/' + file).MoreAdd(plugins), (error) => {
        if (error) console.error(error);
      });
  }
}
Plugin('On');
/*
Plugin('RP', 'translate', 'item.${name}.name', 'blocks/chisel');
Plugin('RP', 'translate', 'tile.${name}.name');
Plugin('RP', 'translate', 'entity.${name}.name');
Plugin('RP', 'translate', 'item.spawn_egg.entity.${name}.name');
*/
module.exports = { Plugin };
