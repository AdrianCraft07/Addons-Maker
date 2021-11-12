const nulo = undefined || false || '';

function P(a, b) {
  var ac = 0;
  while (a[ac] != undefined) {
    if (a[ac] == b) return `${b}`
    ac++
  }
  return `${b} no esta registrado`;
}
function Next(a, matriz, callback) {
  var ac = 0;
  while (a != ac++) {
    matriz.push(ac);
    callback('Llenando', ac);
  }
  callback('Ok');
  /*
	 * aga.Next([], function(evento, valor) {
   *  if ("Llenando" === evento) {
   *    var a=valor/100
	 *  console.clear()
   *    console.log(`[BP/RP] ${name}_${type} al ${a}%`);
   *  }
   *});
	*/
}

function Fin(text, fin) {
  console.log(`[${text}] teminado al 100%\n\n${fin}`);
}
function Tags(json, tag, lvl) {
  var ac = 0;
  if (lvl + 1 + 1 == lvl + 2) {
	if(lvl==0){
      json[`tag:${tag}_bedrock`] = {};
      delete json['tag:minecraft:is_pickaxe'];
	}else{
      while (lvl != ac++) {
        json[`tag:${tag}_${ac}`] = {};
      }
	}
  } else {
    console.log(
      `
Error: Se esperaba un numero o "bedrock"
    "${lvl}" es invalido (${__dirname + 'on\\ore.json'}:tools.pickaxe_lvl)
    Las tags no se crearon
    Si las tags no se crean el pico no sera compatible con los  bloques de 'aga'
    
    `
    );
  }
  return json;
}
function UnTags(json, tag, lvl) {
  var ac = 0;
  while (lvl != ac++ && lvl == 0) {
    delete json[`tag:${tag}_${ac}`];
  }
  delete json['tag:minecraft:is_axe'];
  delete json['tag:minecraft:is_hoe'];
  delete json['tag:minecraft:is_sword'];
  delete json['tag:minecraft:is_shovel'];
  delete json['tag:minecraft:is_pickaxe'];
  delete json['minecraft:can_destroy_in_creative'];
  return json;
}

function BDig(a, b) {
  var ac = 0;
  while (a[ac] != undefined) {
    b.push(a[ac]);
    ac++;
  }
  return b;
}

module.exports = { Next, Fin, Tags, UnTags, BDig };
