module['exports'] = async () => {
  const BP = await require('../../src/script/Behavior');
  const RP = await require('../../src/script/Resource');

  let blockBP = new BP.Block();
  await blockBP.read({
    id: 'aga',
    tag: 'stone',
    lvl: 1,
    name: 'material',
    type: 'Construction',
    color: '#000000',
    folder: '',
    plugins: false,
    is_stone: false,
    is_table: false,
    destroy_time: 5,
    itemCount: { min: 1, max: 1 },
    config_table: { description: 'hudScreen.tooltip.crafting', tags: ['crafting_table'] },
  });

  let blockRP = new RP.Block();
  await blockRP.read({ id: 'aga', name: 'material', sound: 'stone', is_table: false, folder: false });
};
