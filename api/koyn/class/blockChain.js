import { Block } from "./block.js";
import { Util } from "../../../../../src/util/class/Util.js";
import fs from "fs";
import colors from "colors/safe.js";


export class BlockChain {

	constructor() {
		this.chain = [];
	}

  currentConfig(){
    switch (new Util().l(this.chain)) {
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

	async addBlock(obj) {
    let block = new Block();
		await block.mineBlock(obj);
    this.chain.push(block);
		console.log(colors.yellow('BlockChain Validator Status ->'));
		console.log(colors.yellow(this.checkValid()));
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

	async mainProcess(obj){
		for(let i=0; i<obj.totalBlocks; i++){
			await this.addBlock({
				rewardAddress: obj.rewardAddress,
				paths: obj.paths,
				config: this.currentConfig()
			});
		}
		this.generateJSON();
	}

	generateJSON(){
		fs.writeFileSync(
	    './blockChain.json',
	    new Util().jsonSave(this.chain),
	    'utf-8'
	  );
	}

}
