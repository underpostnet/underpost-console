


var shell = require('shelljs');
var fs = require('fs');
var fileGetContents = require("file-get-contents");
var colors = require("colors/safe.js");

var charset = 'utf8';
var data = JSON.parse(fs.readFileSync(
  './data/underpost.json',
  charset));
var ip = null;

console.log(process.argv);
var dev = process.argv.slice(2)[0]=='d' ? true: false;

var PROCESS = null;

const timer = ms => new Promise(res => setTimeout(res, ms));

const validateIP = ipaddress => {
   if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress))
    {
      return true;
    }
  return false;
};

const getIP = async indexIP => {

  const sourceIP = [
    ['http://ipecho.net/plain',false],
    ['https://ident.me/',false],
    ['https://v4.ident.me/',false],
    ['https://api.ip.sb/ip',false],
    ['https://api-ipv4.ip.sb/ip',false],
    ['https://api.ipify.org/?format=json',true],
    ['https://api64.ipify.org/?format=json',true]
  ];

  const newAttempIP = async (resolve, error) => {
    indexIP++;
    await timer(2000);
    if(indexIP<sourceIP.length){
      console.log(colors.red('error ip url: '+sourceIP[indexIP-1][0]));
      console.log(error);
      console.log(colors.yellow("getIP new attemp: "+sourceIP[indexIP][0]));
      resolve(await getIP(indexIP));
    }else {
      resolve(await getIP(0));
    }
  };

  return await new Promise((resolve)=>{

    indexIP == undefined ? indexIP = 0 : null;

    fileGetContents(sourceIP[indexIP][0]).then(async content => {

        sourceIP[indexIP][1] == true ? content = JSON.parse(content)['ip'] : null;

        if(validateIP(content)){
          console.log(colors.yellow('new ip:'+content+' date:'+new Date().toLocaleString()));
          resolve(content);
        }else{
          await newAttempIP(resolve, 'not valid ip content');
        }

    }).catch(async error => {

      await newAttempIP(resolve, error);

    });

  });
};

const execApp = async () => {

  console.log(colors.cyan(" execApp > new start main proccess"));

  if(!dev){
    shell.exec('npx kill-port '+data.http_port);
  }
  // await shell.exec('npx kill-port '+data.ws_port);
  // await shell.exec('npx kill-port '+data.peer_port);
  // await shell.exec('npx kill-port '+data.ws_koyn_port);

  // shell.cd(data.genPath);
  // shell.exec('node gen');
  // shell.cd(data.mainPath);

  shell.exec('node gen');
  PROCESS = shell.exec('node temp/app.js '+(dev?'d':'p'));
};

const mainProcess = async () => {

  ip = await getIP();
  execApp();

  setInterval(async () => {

    let aux_ip = await getIP();

    if(aux_ip != ip){

      // console.clear();
      ip = aux_ip;
      // PROCESS.kill("SIGINT");
      // execApp();

    }

  }, data.interval_check_ip);

};


mainProcess();
