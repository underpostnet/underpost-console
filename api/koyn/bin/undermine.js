

//  Developed By Francisco Verdugo <fcoverdugoa@underpost.net>
//  https://github.com/underpostnet/underpost-network

// https://cryptojs.gitbook.io/docs/
// const  = require('crypto-js/sha256');

import { BlockChain } from "../class/blockChain.js";
import { RestService } from "../../../../../src/rest/class/RestService.js";
import { Util } from "../../../../../src/util/class/Util.js";
import fs from "fs";

var KOYN = new BlockChain();

const pathData = 'https://www.cyberiaonline.com/koyn';


/* crear sistema de sucesión de requests */

/* bases de datos de aplicaciones virtuales */

await new RestService().getContent(pathData ,
  (data)=>{
    console.log('restService success');
    KOYN.addBlock({
      data: {cyberiaonline: data, underPostCardGame: {}},
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
      data: {cyberiaonline: data, underPostCardGame: {}},
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
  new Util().jsonSave(KOYN.chain),
  'utf-8'
);
