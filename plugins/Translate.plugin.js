const fs = require('fs');
require('../src/js/carpetas').text();
const addon = require('../data/addon.json').name;
//Las funciones BP y RP son para verificar si puede modificar algun archivo de estas carpetas los valores por defecto returnan false
//En caso de que si modifiquen algun archivo de estas carpetas se le debe agregar que tipo de archivo verificando con ifs si estos son iguales a los que se buscan en estos casos se retorna con un true
//Si se agrega que modifique un tipo de archivos de la carpeta se debe agregar un else if(type=='') que retorne true y un else al final que rotorne un false para que si los archivos a modificar no coinciden no se les haga ninguna modificacion ya que esto podria causar un error en el programa y borrar el codigo de los archivos
function BP(type) {
  return false;
}
function RP(type) {
  if (type == 'translate') return true;
  else if (type == '') return true;
  else return false;
}

//Esta funcion es llama por los archivos para hacer las traduciones
function TranslateR(origen, type) {
  var n = 0,
    i = 0;
  const T = require('../data/plugins.json').Translate;

  //Verificar la cantidad de traduciones y las crea
  while (T[n] != undefined) {
    while (T[n].lang[i] != undefined) {
      fs.appendFileSync(`../../${addon}_RP/texts/${T[n].lang[i]}.lang`, `${origen}=${trdu(n, T, type)}\n`, (error) => {});
      i++;
    }
    n++;
    i = 0;
  }
  console.log('[RP] (Translate) :D')
}
//Esta funcion sirve para hacer ciertos calculos de como debe ir la traducion
function trdu(n, T, type) {
  let PluginName;
  var ts = type.split('/');
  if (ts[1] == undefined) PluginName = wt(T[n][type].split(':'));
  else PluginName = wt(T[n][ts[0]][ts[1]].split(':'));
  return rt(PluginName);

  function wt(Tr) {
    var a = 0;
    while (Tr[a] != undefined) {
      if (Tr[a] == 'name') Tr[a] = T[n].Translate;
      if (Tr[a].split('*')[1] != undefined) {
        if(T[n][Tr[a].split('*')[1]] != undefined) Tr[a] = T[n][Tr[a].split('*')[1]]
        else Tr[a] = ''
      }
      a++;
    }
    return Tr
  }
  function rt(PlNa) {
    var re = '',
    a=0
    while (PlNa[a] != undefined) {
      re+=PlNa[a]
      a++
    }
    return re
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
        hoe: 'Azada de :name:'
      },
      armor: {
        helmet: 'Casco de :name:',
        chestplate: 'Pechera de :name:',
        leggins: 'Pantalones de :name:',
        boots: 'Botas de :name:'
      },
      blocks: {
        ore: 'Mineral de :name:',
        raw: 'Bloque de :name: crudo',
        block: 'Bloque de :name:',
        deepslate_ore: 'Mineral de :name: de pizarra abismal'
      },
      items: {
        ingot: 'Lingote de :name:',
        raw: ':name: crudo',
        egg: 'Generador de :name:'
      }
    },
    {
      Translate: '',
      lang: ['en_US', 'en_GB'],
      tools: {
        pickaxe: ':name: pickaxe',
        shovel: ':name: shovel',
        sword: ':name: sword',
        axe: ':name: axe',
        hoe: ':name: hoe'
      },
      armor: {
        helmet: ':name: helmet',
        chestplate: ':name: chestplate',
        leggins: ':name: leggins',
        boots: ':name: boots'
      },
      blocks: {
        ore: ':name: ore',
        raw: 'raw :name: block',
        block: ':name: block',
        deepslate_ore: 'Deepslate :name: ore'
      },
      items: {
        ingot: ':name: ingot',
        raw: 'raw :name:',
        egg: 'Generador de :name:'
      }
    }
  ];
  return JSON.stringify(json);
}
function MoreAdd(json) {
  return false;
}
function Stop(type) {
  return false;
}
module.exports = { TranslateR, BP, RP, Add, MoreAdd, Stop };

//Este plugin fue terminado el 31 de octubre de el 2021 a las 3:48a.m. hora mexico
