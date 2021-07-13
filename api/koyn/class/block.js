import SHA256 from "crypto-js/sha256.js";
import { RestService } from "../../../../../src/rest/class/RestService.js";
import colors from "colors/safe.js";
import { Util } from "../../../../../src/util/class/Util.js";


export class Block {

    constructor() {

      this.node = {};
      this.block = {};
      this.hash = "";
      this.nonce = 0;

    }

    calculateHash() {
      switch (this.block.index) {
        case 0:
          return SHA256(
            new Util().JSONstr({
              node: this.node,
              block: this.block,
              dataGenesis: this.dataGenesis,
              nonce: this.nonce
            })
          ).toString();
        default:
          return SHA256(
            new Util().JSONstr({
              node: this.node,
              block: this.block,
              nonce: this.nonce
            })
          ).toString();
      }
    }

    async mineBlock(obj) {

      this.node = Object.assign(
        {
          dataApp: await this.setData(
            obj.paths.filter((el)=>{
              return (el.type=='App')
            })
          )
        },
        {
          dataTransaction: await this.setData(
            obj.paths.filter((el)=>{
              return (el.type=='Transaction')
            })
          )
        },
        {
          rewardAddress: obj.rewardAddress
        }
      );

      this.block = Object.assign(this.block, obj.blockConfig);
      obj.blockConfig.index == 0 ? this.dataGenesis = obj.dataGenesis: null;

      console.log(colors.magenta('Mining Block '+this.block.index+' ...'));

    	while(!this.hash.startsWith(this.block.difficulty.zeros)) {
    		this.nonce++;
    		this.hash = this.calculateHash();
        // console.log(this.hash);
    	}

      console.log(this);

    }

    async setData(paths){
      let storage = [];
      for(let path of paths){
        console.log(colors.green('GET DATA  | '+new Date().toLocaleString()+' | url:'+path.url));
        storage.push({
          type: path.type,
          url: path.url,
          data: await new RestService().getJSON(path.url)
        });
      }
      return storage;
    }


}
