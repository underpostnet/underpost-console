

//  Developed By Francisco Verdugo <fcoverdugoa@underpost.net>
//  https://github.com/underpostnet/underpost-network

// KOYN BLOCKCHAIN SYSTEM

import { BlockChain } from "../class/blockChain.js";

new BlockChain({
  rewardConfig: {
    intervalChangeEraBlock: 1, /* 1 - 210000 */
    totalEra: 32,
    totalBlocks: 34
  },
  difficultyConfig: {
    intervalSecondsTime: 10, /* 600sec -> 10 min */
    hashRateSeconds: 6000, /* 6500 hash/sec */
    avgSecTimeBlock: 10,
    zerosConst: "000"
  }
}).mainProcess({
  rewardAddress: "APOJA7S8ASNA9S8WE",
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
