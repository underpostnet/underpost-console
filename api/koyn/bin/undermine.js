

//  Developed By Francisco Verdugo <fcoverdugoa@underpost.net>
//  https://github.com/underpostnet/underpost-network

// https://cryptojs.gitbook.io/docs/
// const  = require('crypto-js/sha256');

import { BlockChain } from "../class/blockChain.js";
import { RestService } from "../../../../../src/rest/class/RestService.js";
import { Util } from "../../../../../src/util/class/Util.js";
import fs from "fs";

var KOYN = new BlockChain();
var pathData;

var storage = {};
async function addBlock(storage, resolve){
  KOYN.addBlock({
    data: storage,
    dataTransaction: {content: "test"},
    rewardAddress: "XXXXXXXXXXXXXXX"
  });
  storage = {};
  resolve();
};

function generateBlock() {
  return new Promise(resolve => {

    // pathData = 'http://localhost:3001/koyn';
    pathData = 'https://www.cyberiaonline.com/koyn';
    new RestService().getContent(pathData , storage,
      (data, storage)=>{
        console.log('restService success -> '+pathData);
        storage.cyberiaonline = data;

              // pathData = 'http://localhost:3001/cards';
              pathData = 'https://www.cyberiaonline.com/cards';
              new RestService().getContent(pathData , storage,
                (data, storage)=>{
                  console.log('restService success -> '+pathData);
                  storage.underPostCardGame = data;

                            addBlock(storage, resolve);

                },
                (error)=>{
                  console.log('restService error -> '+pathData);
                  console.log(error);
                }
              );

      },
      (error)=>{
        console.log('restService error -> '+pathData);
        console.log(error);
      }
    );


  });
}

async function mainProcess() {
  // https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/async_function
  await generateBlock();
  await generateBlock();
  await fs.writeFileSync(
    './blockChain.json',
    new Util().jsonSave(KOYN.chain),
    'utf-8'
  );
  console.log('valid ->');
  console.log(KOYN.checkValid());
}

mainProcess();














// end
