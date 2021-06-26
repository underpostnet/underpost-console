import { Block } from "./block.js";

export class BlockChain {

	constructor() {
		this.chain = [];
	}

  currentConfig(){
    switch (this.chain.length) {
      case 0:
        return {
          index: 0,
          previousHash: "0",
          reward: this.calculateReward(),
          difficulty: this.calculateDifficulty()
        }
      default:
        return {
          index: this.latestBlock().blockChain.index + 1,
          previousHash: this.latestBlock().hash,
          reward: this.calculateReward(),
          difficulty: this.calculateDifficulty()
        }
    }
  }

	latestBlock() {
		return this.chain[this.chain.length - 1];
	}

  calculateReward(){
    /* en genesis es el supply y el transfiere agregando el primer contable */
    return 0;
  }

  calculateDifficulty(){
    return "000";
  }

	addBlock(dataBlock) {
    let block = new Block(dataBlock);
    block.mineBlock(this.currentConfig());
    this.chain.push(block);
	}

	checkValid() {
		for (let i = 1; i < this.chain.length; i++) {
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i - 1];

			if (currentBlock.hash !== currentBlock.calculateHash()) {
				return false;
			}

			if (currentBlock.blockChain.previousHash !== previousBlock.hash) {
				return false;
			}
		}
		return true;
	}
}
