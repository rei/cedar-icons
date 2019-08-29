/* eslint-disable no-console */
const ghpages = require('gh-pages');

// TODO: test that this works
// Don't publish gh-pages if prerelease
if (process.env.NODE_ENV === 'prerelease') return;

else {
  ghpages.publish('docs', (err) => {
    if (err) {
      console.error(`deploy error: ${err}`);
      return;
    }
  
    console.log(`Docs deployed to gh-pages branch`);
  });
}

