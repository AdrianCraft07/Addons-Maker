function attachables() {
  let atta = {
    format_version: '1.8.0',
    'minecraft:attachable': {
      description: {
        identifier: '',
        materials: {
          default: 'armor',
          enchanted: 'armor_enchanted'
        },
        textures: {
          default: `textures/models/armor/`,
          enchanted: 'textures/misc/enchanted_item_glint'
        },
        geometry: {
          default: 'geometry.humanoid.armor.'
        },
        scripts: {
          parent_setup: 'variable.boot_layer_visible = 0.0;'
        },
        render_controllers: ['controller.render.armor']
      }
    }
  };
  return atta
}

module.exports = { attachables };
