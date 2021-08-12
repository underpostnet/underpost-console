//  Developed By Francisco Verdugo <fcoverdugoa@underpost.net>
//  https://github.com/underpostnet/underpost-network


import { Config } from "file://C:/dd/underpost.net/src/node/apps/underpost/api/config/class/config.js";

var dev = process.argv.slice(2)[0]=='d' ? true: false;
console.log(dev);

new Config().mainProcess();
