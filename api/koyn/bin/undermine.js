

//  Developed By Francisco Verdugo <fcoverdugoa@underpost.net>
//  https://github.com/underpostnet/underpost-network

// https://cryptojs.gitbook.io/docs/
// const  = require('crypto-js/sha256');

import { BlockChain } from "../class/blockChain.js";
import { RestService } from "../../rest/class/RestService.js";
import fs from "fs";

var KOYN = new BlockChain();

const pathData = 'https://www.cyberiaonline.com/koyn';

await new RestService().getContent(pathData ,
  (data)=>{
    console.log('restService success');
    KOYN.addBlock({
      data: data,
      dataTransaction: {content: "test"},
      rewardAddress: "XXXXXXXXXXXXXXX"
    });
  },
  (error)=>{
    console.log('restService error');
    console.log(error);
  }
);

await new RestService().getContent(pathData ,
  (data)=>{
    console.log('restService success');
    KOYN.addBlock({
      data: data,
      dataTransaction: {content: "test"},
      rewardAddress: "XXXXXXXXXXXXXXX"
    });
  },
  (error)=>{
    console.log('restService error');
    console.log(error);
  }
);

console.log('valid ->');
console.log(KOYN.checkValid());

/* babelisar y usar json log en vez de null, 4 .. */
fs.writeFileSync(
  './blockChain.json',
  JSON.stringify(KOYN.chain, null, 4),
  'utf-8'
);
