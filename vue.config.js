const webpack = require('webpack');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const glob = require('glob-all');
const path = require('path');

module.exports = {
  filenameHashing: false,
  configureWebpack: {
    output: {
      filename: process.env.VUE_CLI_MODERN_BUILD ? 'pz-palette-maker.js' : 'pz-palette-maker-legacy.js'
    },
    plugins: [
      //new BundleAnalyzerPlugin(),
      // new webpack.optimize.LimitChunkCountPlugin({
      //   maxChunks: 4
      // }),
      new PurgecssPlugin({
        paths: glob.sync([
          path.join(__dirname, './src/index.html'),
          path.join(__dirname, './**/*.vue'),
          path.join(__dirname, './src/**/*.js')
        ])
      })
    ]
  },
  chainWebpack: config => {
    //config.optimization.delete('splitChunks')
    /* if (process.env.NODE_ENV === "production") {
      config.plugin('html').tap((args) => {
        args[0].minify.collapseWhitespace = false
        args[0].minify.removeComments = false
        return args
      })
    } */
  },
  transpileDependencies: [
    /\bvue-awesome\b/
  ]
}


