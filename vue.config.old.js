// const webpack = require('webpack');
// const PurgecssPlugin = require('purgecss-webpack-plugin');
// const glob = require('glob-all');
// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const DynamicCdnWebpackPlugin = require('dynamic-cdn-webpack-plugin');
// const WebpackCdnPlugin = require('webpack-cdn-plugin');
// const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

module.exports = {
  publicPath: '/production-sub-path/',
  outputDir: 'dist/editor/vue',
  filenameHashing: false,
  indexPath: 'index.html',
  configureWebpack: {
    output: {
      //filename: process.env.VUE_CLI_MODERN_BUILD ? 'pz-palette-maker.js' : 'pz-palette-maker-legacy.js'
      publicPath: '/production-sub-path/'
    },
    plugins: [
      /* new WebpackCdnPlugin({
        modules: [
          {
            name: 'vue',
            var: 'Vue',
            // path: 'dist/vue.runtime.min.js'
            prodUrl: 'https://unpkg.com/vue'
          },
          {
            name: 'pz-pui-alpha',
            var: 'pz-pui-alpha',
            // path: 'dist/vue.runtime.min.js'
            prodUrl: 'https://unpkg.com/pz-pui-alpha'
          }
        ],
        publicPath: '/node_modules'
      }), */

      // new HtmlWebpackExternalsPlugin({
      //   externals: [
      //     {
      //       module: 'vue',
      //       entry: {
      //         path: 'https://unpkg.com/vue',
      //         type: 'js',
      //       },
      //       global: 'Vue',
      //     },
      //   ],
      // }),
      
      // new PurgecssPlugin({
      //   paths: glob.sync([
      //     path.join(__dirname, './src/index.html'),
      //     path.join(__dirname, './**/*.vue'),
      //     path.join(__dirname, './src/**/*.js')
      //   ])
      // }),
    ]
  },
  chainWebpack: config => {
     /* if (process.env.NODE_ENV === "production") {
      config.plugin('html').tap((args) => {
        args[0].minify.collapseWhitespace = false
        args[0].minify.removeComments = false
        return args
      })
    } */

  }
  // transpileDependencies: [
  //   /\bvue-awesome\b/
  // ]
}


