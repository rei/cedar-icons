module.exports = {
  configureWebpack: config => {
    // if (process.env.NODE_ENV === 'production') {
    //   // mutate config for production...
    // } else {
    //   // mutate for development...
    // }
    return {
      entry: './docs-src/main.js',
    }
  },
  publicPath: process.env.NODE_ENV === 'production'? '/rei-icons/' : '/',
  outputDir: 'docs',
}
