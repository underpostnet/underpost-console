

//  Developed By Francisco Verdugo <fcoverdugoa@underpost.net>
//  https://github.com/underpostnet/underpost-network

// KOYN BLOCKCHAIN SYSTEM

import { BlockChain } from "../class/blockChain.js";

new BlockChain({
  rewardConfig: {
    intervalChangeEraBlock: 1, /* 1 - 210000 */
    totalEra: 32
  },
  difficultyConfig: {
    intervalSecondsTime: 600, /* 600sec -> 10 min */
    hashRateSeconds: 100 /* 6500 hash/sec */
  }
}).mainProcess({
  rewardAddress: "APOJA7S8ASNA9S8WE",
  totalBlocks: 33,
  paths: [
    {
      url: 'http://localhost:3001/koyn',
      type: 'App'
    },
    {
      url: 'http://localhost:3001/cards',
      type: 'App'
    },
    {
      url: 'http://localhost:91/transactions',
      type: 'Transaction'
    }
  ]
});









// end
