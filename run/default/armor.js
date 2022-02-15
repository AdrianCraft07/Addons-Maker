module['exports'] = async () => {
  const RP = require('../../src/script/Resource');
  const BP = require('../../src/script/Behavior');

  let ItemBP = new BP.Item();
  ItemBP.read({
    id: 'aga',
    name: 'material',
    config: {
      type: 'armor',
      armor: {
        helmet: { durability: 816, armor: 4 },
        chestplate: { durability: 1108, armor: 6 },
        leggings: { durability: 1108, armor: 5 },
        boots: { durability: 960, armor: 3 },
      },
    },
  });
};
