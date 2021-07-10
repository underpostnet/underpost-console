import SHA256 from "crypto-js/sha256.js";
import { RestService } from "../../../../../src/rest/class/RestService.js";
import colors from "colors/safe.js";
import { Util } from "../../../../../src/util/class/Util.js";


export class Block {

    node = {};
    block = {};
    hash = "";

    constructor() {
        this.block.date = (+ new Date());
        this.block.nonce = 0;
    }

    calculateHash() {
      switch (this.block.index) {
        case 0:
          return SHA256(
            new Util().JSONstr({
              node: this.node,
              block: this.block,
              dataGenesis: this.dataGenesis
            })
          ).toString();
        default:
          return SHA256(
            new Util().JSONstr({
              node: this.node,
              block: this.block
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

      console.log(colors.magenta('Mining Block ...'));

    	while(!this.hash.startsWith(this.block.difficulty.zeros)) {
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
