
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

// https://www.npmjs.com/package/shelljs

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

    console.log(colors.yellow(' > UNDERpost.net Manager Update v1.1.0'));

  	this.init();

  }

  async setUp(){

    shell.cd('underpost');
		for(let path of this.underpostPaths){
			console.log(colors.yellow(' > install '+path));
      shell.exec('git clone https://github.com/underpostnet/'+path);
    }

  };

  async upDate(){

    shell.cd('underpost');
    for(let path of this.underpostPaths){
      shell.cd(path);
			console.log(colors.yellow(' > update '+path));
      shell.exec('git pull origin master');
      shell.cd('..');
    }

  }

	async init(){

		if (!shell.which('git')) {
		  // shell.echo('Sorry, this script requires git');
			console.log(colors.red('error > this process requires git'));
		  // shell.exit(1);
			this.exit();
		}

		shell.exec('git pull origin master');

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
		
		shell.cd('..');
		console.log(colors.yellow(' > npm update'));
		await shell.exec('node-update.bat');
		console.log(colors.yellow(' > exec main console'));
		shell.exec('start cmd.exe /K "node src/underpost-manager"');
		// shell.exec('start git-bash.exe /K "node src/underpost-manager"');

	}

	exit(){
		try {
			process.exit();
		}catch(err){
			// console.log(err);
		}
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
