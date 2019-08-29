/* eslint-disable no-console */
const ghpages = require('gh-pages');

ghpages.publish('docs', (err) => {
  if (err) {
    console.error(`deploy error: ${err}`);
    return;
  }

  console.log(`Docs deployed to gh-pages branch`);
});

