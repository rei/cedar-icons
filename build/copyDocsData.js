const fs = require('fs-extra');
const path = require('path');

function resolve(filePath) {
  return path.join(__dirname, filePath);
}

console.log(resolve('../icons'));

// copy built file
fs.copySync(resolve('../dist/'), resolve('../docs-src/lib/'));

// copy icons
fs.copySync(resolve('../icons/'), resolve('../public/icons/'));

