#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');
const { transform } = require('@babel/core');
const { JSDOM } = require('jsdom');

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

fs.outputFileSync('dist/icons.json', JSON.stringify(iconObj, ' ', 2));

const babelOpts = (modules) => ({
  presets: [['@babel/env', { modules, spec: true }]],
  plugins: [
    'babel-plugin-transform-vue-jsx',
    ['@babel/transform-runtime', { "corejs": 3 }]
  ],
});

const esmExports = [];

const jsdom = new JSDOM();

Object.keys(iconObj).forEach(function (name) {
  buildComponent(name, iconObj[name]);
  esmExports.push(`export { default as Icon${_.upperFirst(_.camelCase(name))} } from './components/${name}.esm.js'`)
})

fs.outputFileSync(
  `./dist/icons.esm.js`,
  esmExports.join('\n')
);

function buildComponent(name, content) {
  const fragment = JSDOM.fragment(content).firstChild;
  const attrs = [].reduce.call(
    fragment.attributes,
    (acc, attr) => {
      acc[attr.nodeName] = attr.value;
      return acc;
    },
    {},
  );
  const{ innerHTML} = fragment;

  const declarations = `var attrs = ${JSON.stringify(attrs)};
  `;

  const component = `{
  name: "icon-${name}",
  render: function(h) {
    return (
      <svg
        {...{
          attrs: {
            ...attrs,
            ...this.$attrs,
          },
          on: this.$listeners
        }}
      >${innerHTML}</svg>
    )
  }
}`;
  const js = `${declarations}
module.exports = ${component};
`
  const mjs = `${declarations}
export default ${component};
`

  fs.outputFileSync(
    `./dist/components/${name}.js`,
    transform(js, babelOpts('cjs')).code
  );
  fs.outputFileSync(
    `./dist/components/${name}.esm.js`,
    transform(mjs, babelOpts(false)).code
  );

}
