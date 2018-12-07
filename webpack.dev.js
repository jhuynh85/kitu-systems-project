const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  resolve: {
    alias: { soundmanager2: 'soundmanager2/script/soundmanager2-nodebug-jsmin.js' }
  },
  devServer: {
    contentBase: './dist',
    hot: true,
    proxy: {
      '/api': 'http://localhost:4000'
    }
  }
})
