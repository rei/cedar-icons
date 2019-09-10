/* eslint-disable no-console */
const ghpages = require('gh-pages');

// Don't publish gh-pages if prerelease
if (process.env.NODE_ENV === 'prerelease') {
  console.log(`Prerelease -- not publishing to gh-pages`);
  return;
}

else {
  ghpages.publish('docs', (err) => {
    if (err) {
      console.error(`deploy error: ${err}`);
      return;
    }
  
    console.log(`Docs deployed to gh-pages branch`);
  });
}

