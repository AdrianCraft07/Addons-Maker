//Librerias
const fs = require('fs');

//JSON
const { name, description, uuid } = (addon = require('../../data/addon.json'));

//datos
var RP = `../../${name}_RP`,
  BP = `../../${name}_BP`,
  RP_tex = RP + '/textures',
  RP_atta = RP + '/attachables',
  RP_text = RP + '/texts',
  RP_mode = RP_tex + '/models',
  RP_bloc = RP_tex + '/blocks',
  RP_item = RP_tex + '/items',
  RP_armor = RP_mode + '/armor',
  RP_deep = RP_bloc + '/deepslate',
  BP_loot = BP + '/loot_tables',
  BP_bloc = BP + '/blocks',
  BP_item = BP + '/items',
  BP_reci = BP + '/recipes',
  BP_fea_rule = BP + '/feature_rules',
  BP_feat = BP + '/features',
  BP_loot_bloc = BP_loot + '/blocks';

function manifest() {
  let bp = {
    format_version: 2,
    header: {
      name: name,
      description: description,
      uuid: uuid[0],
      version: [1, 0, 0],
      min_engine_version: [1, 13, 0]
    },
    modules: [
      {
        type: 'data',
        uuid: uuid[1],
        version: [1, 0, 0]
      }
    ],
    dependencies: [
      {
        version: [1, 0, 0],
        uuid: uuid[2]
      }
    ]
  };
  let rp = {
    format_version: 2,
    header: {
      name: name,
      description: description,
      uuid: uuid[2],
      version: [1, 0, 0],
      min_engine_version: [1, 13, 0]
    },
    modules: [
      {
        type: 'resources',
        uuid: uuid[3],
        version: [1, 0, 0]
      }
    ]
  };
  fs.writeFile(`${BP}/manifest.json`, JSON.stringify(bp), (error) => {
    if (error) {
      console.log(error);
    }
  });
  fs.writeFile(`${RP}/manifest.json`, JSON.stringify(rp), (error) => {
    if (error) {
      console.log(error);
    }
  });
}
function blocks() {
  if (fs.existsSync(`${RP_bloc}`)) {
  } else {
    fs.mkdir(`${RP_bloc}`, (error) => {
      if (error) console.log(`Error: ${error}`);
    });
  }
  if (fs.existsSync(`${RP_deep}`)) {
  } else {
    fs.mkdir(`${RP_deep}`, (error) => {
      if (error) console.log(`Error: ${error}`);
    });
  }
}
function items() {
  if (fs.existsSync(`${RP_item}`)) {
  } else {
    fs.mkdir(`${RP_item}`, (error) => {
      if (error) console.log(`Error: ${error}`);
    });
  }
}
function text() {
  if (fs.existsSync(`${RP_text}`)) {
  } else {
    fs.mkdir(`${RP_text}`, (error) => {
      if (error) console.log(`Error: ${error}`);
    });
  }
}

if (fs.existsSync(`${RP}`)) {
} else {
  fs.mkdir(`${RP}`, (error) => {
    if (error) console.log(`Error: ${error}`);
  });
}
if (fs.existsSync(`${BP}`)) {
} else {
  fs.mkdir(`${BP}`, (error) => {
    if (error) console.log(`Error: ${error}`);
  });
}

if (fs.existsSync(`${RP_atta}`)) {
} else {
  fs.mkdir(`${RP_atta}`, (error) => {
    if (error) console.log(`Error: ${error}`);
  });
}
if (fs.existsSync(`${RP_tex}`)) {
} else {
  fs.mkdir(`${RP_tex}`, (error) => {
    if (error) console.log(`Error: ${error}`);
  });
}

if (fs.existsSync(`${RP_mode}`)) {
} else {
  fs.mkdir(`${RP_mode}`, (error) => {
    if (error) console.log(`Error: ${error}`);
  });
}

if (fs.existsSync(`${RP_armor}`)) {
} else {
  fs.mkdir(`${RP_armor}`, (error) => {
    if (error) console.log(`Error: ${error}`);
  });
}

if (fs.existsSync(`${BP_loot}`)) {
} else {
  fs.mkdir(`${BP_loot}`, (error) => {
    if (error) console.log(`Error: ${error}`);
  });
}
if (fs.existsSync(`${BP_bloc}`)) {
} else {
  fs.mkdir(`${BP_bloc}`, (error) => {
    if (error) console.log(`Error: ${error}`);
  });
}
if (fs.existsSync(`${BP_item}`)) {
} else {
  fs.mkdir(`${BP_item}`, (error) => {
    if (error) console.log(`Error: ${error}`);
  });
}
if (fs.existsSync(`${BP_reci}`)) {
} else {
  fs.mkdir(`${BP_reci}`, (error) => {
    if (error) console.log(`Error: ${error}`);
  });
}
if (fs.existsSync(`${BP_fea_rule}`)) {
} else {
  fs.mkdir(`${BP_fea_rule}`, (error) => {
    if (error) console.log(`Error: ${error}`);
  });
}
if (fs.existsSync(`${BP_feat}`)) {
} else {
  fs.mkdir(`${BP_feat}`, (error) => {
    if (error) console.log(`Error: ${error}`);
  });
}

if (fs.existsSync(`${BP_loot_bloc}`)) {
} else {
  fs.mkdir(`${BP_loot_bloc}`, (error) => {
    if (error) console.log(`Error: ${error}`);
  });
}
manifest();
text();
module.exports = { blocks, items, text };
