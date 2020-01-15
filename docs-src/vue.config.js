module.exports = {
  configureWebpack: config => {
    // if (process.env.NODE_ENV === 'production') {
    //   // mutate config for production...
    // } else {
    //   // mutate for development...
    // }
    return {
      entry: './main.js',
    }
  },
  publicPath: process.env.NODE_ENV === 'production'? '/cedar-icons/' : '/',
  outputDir: 'docs',
}
