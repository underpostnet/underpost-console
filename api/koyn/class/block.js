import SHA256 from "crypto-js/sha256.js";

export class Block {

    node = {};
    block = {};
    blockChain = {};
    hash = "";

    constructor(node) {
        // node set
        this.node.data  = node.data;
        this.node.rewardAddress  = node.rewardAddress;
        this.node.dataTransaction  = node.dataTransaction;
        // block set
        this.block.date = (+ new Date());
        this.block.nonce = 0;
    }

    calculateHash() {
      return SHA256(
        JSON.stringify({
          node: this.node,
          blockChain: this.blockChain,
          block: this.block
        })
      ).toString();
    }

    mineBlock(blockChainConfig) {

      this.blockChain.index  = blockChainConfig.index;
      this.blockChain.previousHash  = blockChainConfig.previousHash;
      this.blockChain.reward  = blockChainConfig.reward;
      this.blockChain.difficulty = blockChainConfig.difficulty;

    	while(!this.hash.startsWith(this.blockChain.difficulty)) {
    		this.block.nonce++;
    		this.hash = this.calculateHash();
        // console.log(this.hash);
    	}

      console.log(this);

    }
}
