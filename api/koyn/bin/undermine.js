

//  Developed By Francisco Verdugo <fcoverdugoa@underpost.net>
//  https://github.com/underpostnet/underpost-network

// https://cryptojs.gitbook.io/docs/
// const  = require('crypto-js/sha256');


import { BlockChain } from "../class/blockChain.js";

var KOYN = new BlockChain();

KOYN.addBlock({
  data: {content: "test"},
  dataTransaction: {content: "test"},
  rewardAddress: "XXXXXXXXXXXXXXX"
});

KOYN.addBlock({
  data: {content: "test"},
  dataTransaction: {content: "test"},
  rewardAddress: "XXXXXXXXXXXXXXX"
});

console.log('valid ->');
console.log(KOYN.checkValid());
