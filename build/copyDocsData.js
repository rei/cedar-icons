const fs = require('fs-extra');
const path = require('path');
const rm = require('rimraf');

function resolve(filePath) {
  return path.join(__dirname, filePath);
}

// clean & copy built file
rm.sync(resolve('../docs-src/lib/'));
fs.copySync(resolve('../dist/'), resolve('../docs-src/lib/'));

// clean & copy icons
rm.sync(resolve('../public/icons/'));
fs.copySync(resolve('../icons/'), resolve('../docs-src/public/icons/'));
