
import { Util } from "../../../../../src/util/class/Util.js";
import fs from "fs";
import colors from "colors/safe.js";
import var_dump from 'var_dump';
import WebSocket from 'ws';
import readline from 'readline';
import fetch from 'node-fetch';


const h = async query => new Promise((resolve, reject) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  const stdin = process.openStdin();
  process.stdin.on('data', char => {
    char = char + '';
    switch (char) {
      case '\n':
      case '\r':
      case '\u0004':
        stdin.pause();
        break;
      default:
        process.stdout.clearLine();
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(query + Array(rl.line.length + 1).join('*'));
        break;
    }
  });
  rl.question(query, value => {
    rl.history = rl.history.slice(1);
    resolve(value);
  });
});

const r = async query => new Promise((resolve)=>{
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
   rl.question(query, (res) => {
     rl.close();
     resolve(res);
   });
});



export class Cyberia {

  constructor() {}

  async mainProcess(){

    //-----------------------------------------------------------------------
    //-----------------------------------------------------------------------

    console.log('- - - - - - - - - - - - - - - - - - - - - -');
    console.log(colors.yellow(
                '            UNDERpost.net NetWork'));
    console.log(colors.yellow(
                '                MAIN CONSOLE '));
    console.log('- - - - - - - - - - - - - - - - - - - - - -');

    //-----------------------------------------------------------------------
    //-----------------------------------------------------------------------

    // https://www.npmjs.com/package/node-fetch

    const email = await r("email: ");
    console.log(email);

    const password = await h("password: ");
    console.log(password);



    const body = { email: email, pass: password };

    fetch('http://localhost:3001/log_in', {
            method: 'post',
            body:    JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        })
        .then(res => res.json())
        .then(json => {
          console.log("fetch response ->");
          console.log(json);
          // console.clear();
        });




    //-----------------------------------------------------------------------
    //-----------------------------------------------------------------------




   //-----------------------------------------------------------------------
   //-----------------------------------------------------------------------


















   //-----------------------------------------------------------------------
   //-----------------------------------------------------------------------

  }

}
