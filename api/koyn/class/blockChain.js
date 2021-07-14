import { Block } from "./block.js";
import { Util } from "../../../../../src/util/class/Util.js";
import SHA256 from "crypto-js/sha256.js";
import fs from "fs";
import colors from "colors/safe.js";


export class BlockChain {

	constructor(obj) {

		this.chain = [];

		this.difficultyConfig = obj.difficultyConfig;

		this.rewardConfig = Object.assign(
			{
				era: [],
				reward: [],
				blocks: [],
				rewardPerBlock: [],
				sumBlocks: 0,
				sumReward: 0
			},
			obj.rewardConfig
		);
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

		// console.log(colors.yellow('rewardConfig BlockChain ->'));
		// console.log(this.rewardConfig);

		fs.writeFileSync(
	    '../data/rewardConfig.json',
	    new Util().jsonSave(this.rewardConfig),
	    'utf-8'
	  );

	}

  currentBlockConfig(){
		let diff = this.calculateDifficulty();
    switch (new Util().l(this.chain)) {
      case 0:
        return {
          index: 0,
          previousHash: SHA256(
						new Util().JSONstr(this.genesisBlockChainConfig())
					).toString(),
          reward: this.calculateReward(),
          difficulty: {
						zeros: diff.zeros,
						targetHash: diff.target,
						difficulty: diff.difficulty
					},
					date: (+ new Date())
        }
      default:
        return {
          index: this.latestBlock().block.index + 1,
          previousHash: this.latestBlock().hash,
          reward: this.calculateReward(),
					difficulty: {
						zeros: diff.zeros,
						targetHash: diff.target,
						difficulty: diff.difficulty
					},
					date: (+ new Date())
        }
    }
  }

	genesisBlockChainConfig(){
		return {
			difficultyConfig: this.difficultyConfig,
			rewardConfig: this.rewardConfig
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
				let indexBlock = this.latestBlock().block.index+1;
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

		const numberTo64BitBigInt = (x) => {
			const lo = x | 0;
			const rawHi = (x / 4294967296.0) | 0; // 2^32
			const hi = (x < 0 && lo != 0) ? (rawHi - 1) | 0 : rawHi;
			return (BigInt(hi) << 32n) | BigInt(lo >>> 0);
		}

		const diffToTarget = (diff) => {
			var buf = Buffer.alloc(32).fill(0);

			if(!isFinite(diff) || diff <= 0) {
				buf.fill(0xff);
				return buf.toString('hex');
			}
			var k = 6;
			for (; k > 0 && diff > 1.0; k--) {
				diff /= 4294967296.0;
			}
			var m = BigInt(numberTo64BitBigInt((4.294901760e+9 / diff)))
			buf.writeUInt32LE(Number(0xffffffffn & m) >>> 0, k << 2);
			buf.writeUInt32LE(Number(m >> 32n) >>> 0, 4 + (k << 2));
			return buf.toString('hex');
		};

		const getZerosHash = (hash) => {
			let charList = [];
			for(let char of hash){
				charList.push(char);
			}
			charList = charList.reverse();
			let target = "";
			for(let char of charList){
				if(char=="0"){
					target+=char;
				}else{
					break;
				}
			}
			return target;
		};

		const getDiff = (obj) => {
		  return  ((obj.intervalSecondsTime*obj.hashRateSeconds)/Math.pow(2, 32))
		};

		const getHashTimeData = () => {
			let lastDate = this.latestBlock().block.date;
			let currentDate = (+ new Date());
			let intervalSecondsTime = ((currentDate-lastDate)/1000);
			let hashRateSeconds = this.latestBlock().nonce/intervalSecondsTime;
			return {
				lastDate: lastDate,
				currentDate: currentDate,
				intervalSecondsTime: intervalSecondsTime,
				hashRateSeconds: hashRateSeconds
			};
		};

		const formatDiff = (diff) => {
			let returnTarget = diffToTarget(diff);
			let returnZeros = getZerosHash(returnTarget);
			return {
				zeros: returnZeros,
				target: returnTarget,
				difficulty: diff
			};
		};

		const processDiff = (genesis) => {

			switch (genesis) {
				case true:
					let returnDifficulty = getDiff(this.difficultyConfig);
					let returnTarget = diffToTarget(returnDifficulty);
					let returnZeros = getZerosHash(returnTarget);
					return {
						zeros: returnZeros,
						target: returnTarget,
						difficulty: returnDifficulty
					}
				default:
					let dataLastBlockTime = getHashTimeData();
					if(this.difficultyConfig.avgSecTimeBlock==dataLastBlockTime.intervalSecondsTime){
						return this.latestBlock().block.difficulty;
					}
					if(this.difficultyConfig.avgSecTimeBlock>dataLastBlockTime.intervalSecondsTime){
						let difference = dataLastBlockTime.intervalSecondsTime / this.difficultyConfig.avgSecTimeBlock;
						let newDiff = this.latestBlock().block.difficulty.difficulty*(1.5 + difference );
						return formatDiff(newDiff);
					}
					if(this.difficultyConfig.avgSecTimeBlock<dataLastBlockTime.intervalSecondsTime){
						let difference = this.difficultyConfig.avgSecTimeBlock / dataLastBlockTime.intervalSecondsTime;
						let newDiff = this.latestBlock().block.difficulty.difficulty*( difference );
						return formatDiff(newDiff);
					}
	  	}


		};

		switch (this.difficultyConfig.zerosConst == null) {
			case true:
				switch (new Util().l(this.chain)) {
					case 0:
						return processDiff(true);
					default:
						return processDiff(false);
				}
			default:
				return {
					zeros: this.difficultyConfig.zerosConst,
					target: "XXX",
					difficulty: 100
				}
  	}

	}

	async addBlock(obj) {
		console.log('\n---------------------------------------');
		console.log(colors.yellow('NEW BLOCK | '+new Date().toLocaleString()));
		console.log(obj.blockConfig);
    let block = new Block();
		await block.mineBlock(obj);
    this.chain.push(block);
		this.calculateCurrentRewardDelivered();
		console.log(colors.cyan('BlockChain Validator Status -> '+this.checkValid()));
	}

	checkValid() {
		for (let i = 1; i < this.chain.length; i++) {
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i - 1];

			if (currentBlock.hash !== currentBlock.calculateHash()) {
				return false;
			}

			if (currentBlock.block.previousHash !== previousBlock.hash) {
				return false;
			}
		}
		return true;
	}

	async mainProcess(obj){
		for(let i=0; i<obj.totalBlocks; i++){
			switch (new Util().l(this.chain)) {
				case 0:
					await this.addBlock({
						rewardAddress: obj.rewardAddress,
						paths: obj.paths,
						blockConfig: this.currentBlockConfig(),
						dataGenesis: this.genesisBlockChainConfig()
					})
				default:
					await this.addBlock({
						rewardAddress: obj.rewardAddress,
						paths: obj.paths,
						blockConfig: this.currentBlockConfig()
					})
			}
		}
		this.generateJSON();
	}

	calculateCurrentRewardDelivered(){
		let currentReward = 0;
		for(let block of this.chain){
			currentReward += block.block.reward;
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
