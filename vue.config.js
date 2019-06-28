const webpack = require('webpack')
module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      })
    ]
  },
  chainWebpack: config => {
    config.optimization.delete('splitChunks')
    
    if (process.env.NODE_ENV === "production") {
      config.plugin('html').tap((args) => {
        args[0].minify.collapseWhitespace = false
        args[0].minify.removeComments = false
        return args
      })
    }
  }
}


