const fs = require('fs');
const path = require('path');
const SVGO = require('svgo');

const args = process.argv.slice(2)
const filepath = path.resolve(args[0]);

const svgo = new SVGO({
  plugins: [
    {
      cleanupAttrs: true,
    }, {
      removeDoctype: true,
    }, {
      removeXMLProcInst: true,
    }, {
      removeComments: true,
    }, {
      removeMetadata: true,
    }, {
      removeTitle: true,
    }, {
      removeDesc: true,
    }, {
      removeUselessDefs: true,
    }, {
      removeEditorsNSData: true,
    }, {
      removeEmptyAttrs: true,
    }, {
      removeHiddenElems: true,
    }, {
      removeEmptyText: true,
    }, {
      removeEmptyContainers: true,
    }, {
      removeViewBox: false,
    }, {
      cleanupEnableBackground: true,
    }, {
      convertStyleToAttrs: true,
    }, {
      convertColors: true,
    }, {
      convertPathData: true,
    }, {
      convertTransform: true,
    }, {
      removeUnknownsAndDefaults: true,
    }, {
      removeNonInheritableGroupAttrs: true,
    }, {
      removeUselessStrokeAndFill: true,
    }, {
      removeUnusedNS: true,
    }, {
      cleanupIDs: true,
    }, {
      cleanupNumericValues: true,
    }, {
      moveElemsAttrsToGroup: true,
    }, {
      moveGroupAttrsToElems: true,
    }, {
      collapseGroups: true,
    }, {
      removeRasterImages: false,
    }, {
      mergePaths: true,
    }, {
      convertShapeToPath: true,
    }, {
      sortAttrs: true,
    }, {
      removeDimensions: true,
    }, {
      removeAttrs: {attrs: '(stroke|fill)'},
    }
  ]
});

fs.readFile(filepath, 'utf8', function(err, data) {
  if (err) {
    throw err;
  }

  svgo.optimize(data, {path: filepath}).then(function(result) {
    const fileName = filepath.split('/').reverse()[0];
    const optimizedSVG = result.data.replace('<path d=', '<path role="presentation" d=');
    fs.writeFile(`./icons/${fileName}`, optimizedSVG, function(err2) {
      if (err2) {
        throw err2;
      }
    });
  });
});
