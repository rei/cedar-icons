const fs = require('fs-extra');
const path = require('path');

function resolve(filePath) {
  return path.join(__dirname, filePath);
}

// copy icons
fs.copySync(resolve('../icons/'), resolve('../dist/icons/'));

