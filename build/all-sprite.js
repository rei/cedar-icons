const fs = require('fs-extra');
const svgstore = require('svgstore');
const path = require('path');

const sprite = svgstore();

const getSvg = svgFilePath => fs.readFileSync(svgFilePath, 'utf8');

// recursively loop through directories
const makeSprite = (filePath, iconObj) => {
  const files = fs.readdirSync(filePath);

  for (let i = 0, l = files.length; i < l; i++) {
    const fileName = files[i];
    const newPath = path.join(filePath, fileName);

    // check if it's a directory or file
    if (fs.statSync(newPath).isDirectory()) {
      makeSprite(newPath, iconObj[fileName]);
    } else {
      const name = path.basename(newPath, '.svg');
      sprite.add(name, getSvg(newPath));
    }
  }
}

makeSprite(path.resolve('icons/'), {});

fs.outputFileSync('dist/all-icons.svg', sprite);
