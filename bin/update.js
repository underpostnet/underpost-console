

'use strict';

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

const shell = require('shelljs');
const { promises: fs } = require('fs');
const _fs = require('fs');
const path = require('path');

async function copyDir(src, dest) {
    await fs.mkdir(dest, { recursive: true });
    let entries = await fs.readdir(src, { withFileTypes: true });

    for (let entry of entries) {
        let srcPath = path.join(src, entry.name);
        let destPath = path.join(dest, entry.name);

        entry.isDirectory() ?
            await copyDir(srcPath, destPath)
            .catch( err => null/*console.log(colors.red(err))*/ ) :
            await fs.copyFile(srcPath, destPath)
            .catch( err => null/*console.log(colors.red(err))*/ );
    }
};

const colors = require('colors/safe.js');
const charset = 'utf8';
const folderConsole = 'underpost-console';

const getProjectName = dep => dep.split('/').pop();

const writeModules = async projectName => {
  switch (projectName) {
    case 'underpost.net':
      console.log(colors.yellow(' build -> underpost.net \n'));
      await copyDir('../underpost.net/underpost-modules-v1', './underpost_modules/underpost-modules-v1');
      await copyDir('../underpost.net/underpost-modules-v2', './underpost_modules/underpost-modules-v2');
      break;
    case 'underpost-data-template':
      console.log(colors.yellow(' build -> underpost-data-template \n'));
      await copyDir('../underpost-data-template', './underpost_modules/underpost-data-template');
      // eliminar .git de template en underpost_modules
      break;
    default:
      console.log(colors.yellow(' build -> invalid dependency \n'));
  }
  // shell.exec('start cmd /k npm start');
  // /k or /c for command
};

const install = async dep => {
  console.log(colors.yellow(' install -> '+getProjectName(dep)));
  shell.cd('..');
  shell.exec('git clone '+dep);
  shell.cd(folderConsole);
  await writeModules(getProjectName(dep));
};
const update = async dep => {
  console.log(colors.yellow(' update -> '+getProjectName(dep)));
  shell.cd('..');
  shell.cd(getProjectName(dep));
  shell.exec('git pull origin master');
  shell.cd('..');
  shell.cd(folderConsole);
  await writeModules(getProjectName(dep));
};

! _fs.existsSync('./underpost_modules') ?
_fs.mkdirSync('./underpost_modules') : null;

[
  'https://github.com/underpostnet/underpost.net',
  'https://github.com/underpostnet/underpost-data-template'
].map( dep => _fs.existsSync('../'+getProjectName(dep) ) ?
        update(dep) : install(dep) );










// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
