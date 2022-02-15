///library
const { newFolder } = require('../../library').log;
///JSON
const { name, description, uuid, project } = (addon = require('../data/addon.json'));

///Data
const folder = `../../${project}`,
  RP = `${folder}/${name}_RP`,
  BP = `${folder}/${name}_BP`,
  RP_tex = '/textures',
  RP_atta = '/attachables',
  RP_text = '/texts',
  RP_mode = '/models',
  RP_bloc = '/blocks',
  RP_item = '/items',
  RP_armor = '/armor',
  BP_loot = '/loot_tables',
  BP_bloc = '/blocks',
  BP_item = '/items',
  BP_recipe = '/recipes',
  BP_fea_rule = '/feature_rules',
  BP_feat = '/features',
  Manifest = '/manifest.json';

let MANIFEST = {
  BP: {
    format_version: 2,
    header: {
      name: name,
      description: description,
      uuid: uuid[0],
      version: [1, 0, 0],
      min_engine_version: [1, 13, 0],
    },
    modules: [
      {
        type: 'data',
        uuid: uuid[1],
        version: [1, 0, 0],
      },
    ],
    dependencies: [
      {
        version: [1, 0, 0],
        uuid: uuid[2],
      },
    ],
  },
  RP: {
    format_version: 2,
    header: {
      name: name,
      description: description,
      uuid: uuid[2],
      version: [1, 0, 0],
      min_engine_version: [1, 13, 0],
    },
    modules: [
      {
        type: 'resources',
        uuid: uuid[3],
        version: [1, 0, 0],
      },
    ],
  },
};

let Project = () => newFolder(folder);

let Behavior = async () => {
  Project();
  let returns = newFolder(BP);
  MANIFEST.BP.toJson().createFile(BP + Manifest);
  return returns;
};
Behavior.blocks = async name =>
  newFolder(`${newFolder(`${await Behavior()}${BP_bloc}`)}/${name || ''}`);
Behavior.item = async () => newFolder(`${await Behavior()}/${BP_item}`);
Behavior.loot = async name => newFolder(`${newFolder(`${await Behavior()}/${BP_loot}`)}/${name || ''}`);
Behavior.recipe = async name => newFolder(`${newFolder(`${await Behavior()}/${BP_recipe}`)}/${name || ''}`);

Behavior.feature = async () => {
  await Behavior();
  newFolder(BP_feat);
  return newFolder(BP_fea_rule);
};

let Resource = async () => {
  Project();
  let returns = newFolder(RP);
  MANIFEST.RP.toJson().createFile(RP + Manifest);
  return returns;
};
Resource.attachables = async () => newFolder(`${await Resource()}/${RP_atta}`);
Resource.texts = async () => newFolder(`${await Resource()}/${RP_text}`);
Resource.textures = async () => newFolder(`${await Resource()}/${RP_tex}`);
Resource.textures.items = async () => newFolder(`${await Resource.textures()}/${RP_item}`);
Resource.textures.models = async () => newFolder(`${await Resource.textures()}/${RP_mode}`);
Resource.textures.models.armor = async () =>
  newFolder(`${await Resource.textures.models()}/${RP_armor}`);
Resource.textures.blocks = async name =>
  newFolder(`${newFolder(`${await Resource.textures()}/${RP_bloc}`)}/${name || ''}`);

Project.Behavior = Behavior;
Project.Resource = Resource;

module.exports = Project;
