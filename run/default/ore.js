module['exports'] = async () => {
  const BP = await require('../../src/script/Behavior');
  const RP = await require('../../src/script/Resource');

  let blockBP = new BP.Block();
  await blockBP.read({
    id: 'aga',
    tag: 'stone',
    lvl: 2,
    name: 'material_ore',
    type: 'Construction',
    color: '#000000',
    is_stone: true,
    destroy_time: 10,
  });
  await blockBP.read({
    id: 'aga',
    tag: 'stone',
    lvl: 2,
    name: 'material_block',
    type: 'Construction',
    color: '#000000',
    is_stone: true,
    destroy_time: 10,
  });

  let blockRP = new RP.Block();
  await blockRP.read({ id: 'aga', name: 'material_ore', sound: 'stone', is_table: false, folder: false });
  await blockRP.read({ id: 'aga', name: 'material_block', sound: 'stone', is_table: false, folder: false });
  console.log('ore')
};
