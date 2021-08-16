//  Developed By Francisco Verdugo <fcoverdugoa@underpost.net>
//  https://github.com/underpostnet/underpost-network

import { Config } from
"file://{{path}}/underpost/underpost.net/src/node/src/network/api/config/class/config.js";

let dataPath = "{{path}}/data/underpost.json"
new Config().mainProcess({
  dataPathTemplate: dataPath,
  dataPathSave: dataPath
});

// "file://{{path}}/underpost/underpost.net/src/node/src/network/api/config/class/config.js";

// let dataPath = "{{path}}/data/underpost.json"
