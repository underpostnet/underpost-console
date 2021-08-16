
//------------------------------------------------------------------------------
//
//      UNDERpost.net NetworK System
//
//      Developed By Francisco Verdugo <fcoverdugoa@underpost.net>
//      https://underpost.net/
//
//------------------------------------------------------------------------------


const shell = require('shelljs');
const colors = require("colors/safe.js");

console.log(colors.yellow('update underpost.net'));


const underpostPaths =
[
  'underpost-library',
  'underpost.net',
  'underpost-data-template'
];

shell.cd('underpost');

for(let path of underpostPaths){
  shell.cd(path);
  shell.exec('git pull origin master');
  shell.cd('..');
}
