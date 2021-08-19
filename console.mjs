//  Developed By Francisco Verdugo <fcoverdugoa@underpost.net>
//  https://github.com/underpostnet/underpost-network

import { Config } from
"file://{{path}}/underpost/underpost.net/src/node/src/network/api/config/class/config.js";
import { Util } from
"file://{{path}}/underpost/underpost.net/src/node/src/util/class/util.js";
let dir = "{{path}}";

import fs from "fs";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------


let dataPath = dir+"/data/underpost.json";
var charset = 'utf8';

var data = JSON.parse(fs.readFileSync(dataPath));
console.log(data);


console.log(new Util().getKeys(data));


/* new Config().mainProcess({
  dataPathTemplate: dataPath,
  dataPathSave: dataPath
}); */





//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

/*

import { Config } from
"file://{{path}}/underpost/underpost.net/src/node/src/network/api/config/class/config.js";
import { Util } from
"file://{{path}}/underpost/underpost.net/src/node/src/util/class/util.js";
let dir = "{{path}}";

*/

















//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
