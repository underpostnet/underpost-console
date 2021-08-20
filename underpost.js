
//------------------------------------------------------------------------------
//
//      UNDERpost.net NetworK System
//
//      Developed By Francisco Verdugo <fcoverdugoa@underpost.net>
//      https://underpost.net/
//
//------------------------------------------------------------------------------

const fs = require('fs');
const colors = require('colors/safe.js');
const shell = require('shelljs');
const path = require('path');

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

var charset = 'utf8';

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


//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

class UnderPost {

  constructor(underpostPaths){

    this.underpostPaths = underpostPaths;

    console.log(colors.yellow(' > UNDERpost.net Manager v1.1.0'));

  	this.init();

  }

  async setUp(){

		console.log(colors.yellow(' > init setUp'));

    shell.cd('underpost');
    shell.exec('git clone https://github.com/underpostnet/underpost-library');
    shell.exec('git clone https://github.com/underpostnet/underpost.net');
    shell.exec('git clone https://github.com/underpostnet/underpost-data-template');

  };

  async upDate(){

		console.log(colors.yellow(' > init upDate'));

    shell.cd('underpost');
    for(let path of this.underpostPaths){
      shell.cd(path);
      shell.exec('git pull origin master');
      shell.cd('..');
    }

  }

	async init(){

		! fs.existsSync(dir('/underpost')) ?
		await this.setUp()  :
		await this.upDate() ;

		let content_um =
		fs.readFileSync(dir('src/underpost-manager.js'), charset).split('/* fix */');

		let new_um =
		content_um[0]+`/* fix */'`+dir()+`'/* fix */`+content_um[2];

		await fs.writeFileSync(
		  dir('src/underpost-manager.js'),
		  new_um
		);

	}

}

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

new UnderPost([
  'underpost-library',
  'underpost.net',
  'underpost-data-template'
]);






//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
