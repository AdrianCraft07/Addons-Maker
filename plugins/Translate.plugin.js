const aga = require('../library');
const { name: addon, project } = require('../src/data/addon.json');
const { Project } = require('../src/script/folders');

function BP() {
  return false;
}
function RP() {
  return true;
}
RP.Translate = (_, { language, id }) => {
  Project.Resource.texts();
  const translate = require('../src/data/plugins.json').Translate;
  let data;
  aga.array(translate, newTranslate =>
    aga.array(newTranslate.lang, async lang => {
      let valor = await FTranslate(newTranslate, language);
      data = `${id}=${valor}\n`;
      data.writeFile(`./${project}/${addon}_RP/texts/${lang}.lang`);
    })
  );
  return data;
};

async function FTranslate(translate, language) {
  let pluginName;
  let typeSplit = language.split('/');
  if (!typeSplit[1]) pluginName = translate[language];
  else pluginName = translate[typeSplit[0]][typeSplit[1]];
  return whatTranslate(pluginName);

  function whatTranslate(WTranslate) {
    let data = WTranslate.replaceAll('%name%', translate.Translate);
    data = data.replaceFull(translate.replace || [':'], '%');
    return data;
  }
}
function Add(json) {
  json.Translate = [
    {
      Translate: '',
      lang: ['es_MX', 'es_ES'],
      tools: {
        pickaxe: 'Pico de :name:',
        shovel: 'Pala de :name:',
        sword: 'Espada de :name:',
        axe: 'Hacha de :name:',
        hoe: 'Azada de :name:',
      },
      armor: {
        helmet: 'Casco de :name:',
        chestplate: 'Pechera de :name:',
        leggins: 'Pantalones de :name:',
        boots: 'Botas de :name:',
      },
      blocks: {
        ore: 'Mineral de :name:',
        raw: 'Bloque de :name: crudo',
        block: 'Bloque de :name:',
        deepslate_ore: 'Mineral de :name: de pizarra abismal',
      },
      items: {
        ingot: 'Lingote de :name:',
        raw: ':name: crudo',
        egg: 'Generador de :name:',
      },
    },
    {
      Translate: '',
      lang: ['en_US', 'en_GB'],
      tools: {
        pickaxe: ':name: pickaxe',
        shovel: ':name: shovel',
        sword: ':name: sword',
        axe: ':name: axe',
        hoe: ':name: hoe',
      },
      armor: {
        helmet: ':name: helmet',
        chestplate: ':name: chestplate',
        leggins: ':name: leggins',
        boots: ':name: boots',
      },
      blocks: {
        ore: ':name: ore',
        raw: 'raw :name: block',
        block: ':name: block',
        deepslate_ore: 'Deepslate :name: ore',
      },
      items: {
        ingot: ':name: ingot',
        raw: 'raw :name:',
        egg: 'Generador de :name:',
      },
    },
  ];
  return json.toJson();
}

module['exports'] = { BP, RP, Add };
