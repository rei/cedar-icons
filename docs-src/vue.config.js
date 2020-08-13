module.exports = {
  configureWebpack: () => {
    return {
      entry: './main.js',
    }
  },
  publicPath: process.env.NODE_ENV === 'production'? '/cedar-icons/' : '/',
  outputDir: 'docs',
}
