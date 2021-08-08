

//  Developed By Francisco Verdugo <fcoverdugoa@underpost.net>
//  https://github.com/underpostnet/underpost-network

// KOYN BLOCKCHAIN SYSTEM

import { BlockChain } from "../class/blockChain.js";

new BlockChain({
  generation: '0',
  version: '0.0.0',
  hashGeneration: null,
  previousHashGeneration: null,
  userConfig: {
    blocksToUndermine: null,
    zerosConstDifficulty: null
  },
  rewardConfig: {
    intervalChangeEraBlock: 1, /* 1 - 210000 - 300000 */
    totalEra: 9,
    hashesPerCurrency: 10,
    upTruncFactor: 15
  },
  difficultyConfig: {
    hashRateSeconds: 6000,
    intervalSecondsTime: 10,
    intervalCalculateDifficulty: 10
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
