const fs = require('fs-extra');
const _ = require('lodash');
const icons = require('../dist/icons.js');

const index = [];

// create a .vue file
// TODO: do we want to have these icon components here or in Cedar?
const makeComponent = (name, svg) => {
  const pascalName = _.upperFirst(_.camelCase(name));
  const fileContents = `
export default {
  name: '${pascalName}',
  functional: true,
  render(h, ctx) {
    return ${svg.replace(/<svg([^>]+)>/, '<svg$1 {...ctx.data}>')}
  }
}
`.trim();
  fs.outputFileSync(`dist/components/${pascalName}.js`, fileContents);
  index.push(`export { default as ${pascalName} } from './${pascalName}.js'`)
}

// recursively loop through object to build component
const processObj = (srcObj, name='icon') => {
  _.forOwn(srcObj, (v,k) => {
    let fullName = `${name}-${k}`;
    if(_.isObject(v)) {
      processObj(v, fullName);
    } else {
      makeComponent(fullName, v)
    }
  })
}

// make components from icon definition object
processObj(icons);

// make index of output components
fs.outputFileSync('dist/components/index.js', index.join('\n'));
