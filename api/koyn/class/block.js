import SHA256 from "crypto-js/sha256.js";
import { RestService } from "../../../../../src/rest/class/RestService.js";
import colors from "colors/safe.js";
import { Util } from "../../../../../src/util/class/Util.js";


export class Block {

    node = {};
    block = {};
    blockChain = {};
    hash = "";

    constructor() {
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

    async mineBlock(obj) {

      this.node.dataApp = await this.setData(
        obj.paths.filter((el)=>{
          return (el.type=='App')
        })
      );

      this.node.dataTransaction = await this.setData(
        obj.paths.filter((el)=>{
          return (el.type=='Transaction')
        })
      );

      this.node.rewardAddress = obj.rewardAddress;

      this.blockChain.index  = obj.config.index;
      this.blockChain.previousHash  = obj.config.previousHash;
      this.blockChain.reward  = obj.config.reward;
      this.blockChain.difficulty = obj.config.difficulty;

      console.log(colors.magenta('Mining Block ...'));

    	while(!this.hash.startsWith(this.blockChain.difficulty)) {
    		this.block.nonce++;
    		this.hash = this.calculateHash();
        // console.log(this.hash);
    	}

      console.log(this);

    }

    async setData(paths){
      let storage = [];
      for(let path of paths){
        storage.push({
          type: path.type,
          url: path.url,
          data: await new RestService().getJSON(path.url)
        });
      }
      return storage;
    }


}
