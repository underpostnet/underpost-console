
var fs = require('fs');
var charset = 'utf8';
const path = require('path');
const dir = toPath => {
	switch (toPath) {
		case undefined:
				return __dirname.replace(/\\/g, '/');
			  break;
		default:
			  return path.join(__dirname, toPath).replace(/\\/g, '/')
			  break;
	}
};

var yWorkPath = "./";
var underpostPath = "./underpost/underpost.net/src/node/src"
var yworkDataPath = "./data";

! fs.existsSync(yWorkPath+'/temp') ?
fs.mkdirSync(yWorkPath+'/temp') : null;

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

var requireModules = JSON.parse(
 fs.readFileSync('./underpost/underpost-data-template/import-class.json', charset)
);
var classContent = '';

 classContent +=
   fs.readFileSync(
     underpostPath+'/server/eval/require.js',
     charset);

 for(let module_ of requireModules){
   classContent += `

   // module:`+module_.name+`
   console.log('load class module -> `+module_.name+`');
   `+fs.readFileSync(
     underpostPath+module_.path, charset
   ).split('export')[1];
 }

fs.writeFileSync(
  yWorkPath+'/temp/app.js',
  fs.readFileSync(underpostPath+'/network/api/appServer.js', charset)
  .replace('/*compiler*/', classContent).replace('{{path}}', dir()),
  charset
);

fs.writeFileSync(
  yWorkPath+'/nodemon.json',
  fs.readFileSync(yWorkPath+'/underpost/underpost-data-template/nodemon.json',
  charset)
);




//------------------------------------------------------------------------------
//------------------------------------------------------------------------------












//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
