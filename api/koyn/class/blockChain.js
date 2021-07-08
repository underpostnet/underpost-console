import { Block } from "./block.js";
import { Util } from "../../../../../src/util/class/Util.js";
import SHA256 from "crypto-js/sha256.js";
import fs from "fs";
import colors from "colors/safe.js";


export class BlockChain {

	constructor(obj) {

		this.chain = [];

		this.dataGenesisHash = obj.dataGenesisHash;

		this.rewardConfig = {
			era: [],
			reward: [],
			blocks: [],
			rewardPerBlock: [],
			intervalChangeEraBlock: obj.rewardConfig.intervalChangeEraBlock,
			totalEra: obj.rewardConfig.totalEra,
			sumBlocks: 0,
			sumReward: 0
		};
		this.setRewardConfig();

	}

	setRewardConfig(){

		for(let i of new Util().range(0, this.rewardConfig.totalEra)){

			this.rewardConfig.era.push(i);

			this.rewardConfig.reward.push(
			(this.rewardConfig.intervalChangeEraBlock*
				((50*(10**8))/(2**i)))/(10**8)
			);

			this.rewardConfig.rewardPerBlock.push(
				this.rewardConfig.reward[
					(new Util().l(this.rewardConfig.reward)-1)
				]
				/	this.rewardConfig.intervalChangeEraBlock
			);

			this.rewardConfig.sumBlocks += this.rewardConfig.intervalChangeEraBlock;
			this.rewardConfig.sumReward += this.rewardConfig.reward[
				(new Util().l(this.rewardConfig.reward)-1)
			];
			this.rewardConfig.blocks.push(this.rewardConfig.sumBlocks);

		}

		console.log(colors.yellow('rewardConfig BlockChain ->'));
		console.log(this.rewardConfig);

		fs.writeFileSync(
	    '../data/rewardConfig.json',
	    new Util().jsonSave(this.rewardConfig),
	    'utf-8'
	  );

	}

  currentConfig(){
    switch (new Util().l(this.chain)) {
      case 0:
        return {
          index: 0,
          previousHash: SHA256(
						new Util().JSONstr(this.dataGenesisHash)
					).toString(),
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
		switch (new Util().l(this.chain)) {
			case 0:
				return this.rewardConfig.rewardPerBlock[0];
			default:
				let indexBlock = this.latestBlock().blockChain.index+1;
				console.log('index block test ->');
				console.log(indexBlock);
				for(let i of new Util().range(0, this.rewardConfig.totalEra)){
					switch (i) {
						case 0:
							if((0<indexBlock)&&(indexBlock<this.rewardConfig.blocks[0])){
								return this.rewardConfig.rewardPerBlock[0]
							}
						default:
							if((this.rewardConfig.blocks[i-1]<=indexBlock)&&(indexBlock<this.rewardConfig.blocks[i])){
								return this.rewardConfig.rewardPerBlock[i];
							}
					}
				}
		}
  }

  calculateDifficulty(){
    return "000";
  }

	async addBlock(obj) {
    let block = new Block();
		await block.mineBlock(obj);
    this.chain.push(block);
		this.calculateCurrentRewardDelivered();
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

	calculateCurrentRewardDelivered(){
		let currentReward = 0;
		for(let block of this.chain){
			currentReward += block.blockChain.reward;
		}
		console.log(colors.cyan('Current Reward Delivered -> '+currentReward));
	}

	generateJSON(){
		fs.writeFileSync(
	    '../data/blockChain.json',
	    new Util().jsonSave(this.chain),
	    'utf-8'
	  );
	}

}
