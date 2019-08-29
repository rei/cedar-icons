#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

const getSvg = svgFilePath => fs.readFileSync(svgFilePath, 'utf8');

// recursively loop through directories
const makeObj = (filePath, iconObj) => {
  const files = fs.readdirSync(filePath);

  for (let i = 0, l = files.length; i < l; i++) {
    const fileName = files[i];
    const newPath = path.join(filePath, fileName);
    
    // check if it's a directory or file
    if (fs.statSync(newPath).isDirectory()) {
      iconObj[fileName] = {};
      makeObj(newPath, iconObj[fileName]);
    } else {
      const name = path.basename(newPath, '.svg');
      iconObj[name] = getSvg(newPath);
    }
  }
  return iconObj;
}

const iconObj = makeObj(path.resolve('icons/'), {});

// TODO: remove json output?
fs.outputFileSync('dist/icons.json', JSON.stringify(iconObj, ' ', 2));
fs.outputFileSync('dist/icons.js', `module.exports = ${JSON.stringify(iconObj, ' ', 2)}`);
fs.outputFileSync('dist/icons.esm.js', `export default ${JSON.stringify(iconObj, ' ', 2)}`);

