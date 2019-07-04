const webpack = require('webpack');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const glob = require('glob-all');
const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const DynamicCdnWebpackPlugin = require('dynamic-cdn-webpack-plugin');
const WebpackCdnPlugin = require('webpack-cdn-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

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
      // new HtmlWebpackPlugin(),
      // new DynamicCdnWebpackPlugin(),
      // new WebpackCdnPlugin({
      //   modules: [
      //     {
      //       name: 'vue',
      //       var: 'Vue',
      //       // path: 'dist/vue.runtime.min.js'
      //       prodUrl: 'https://unpkg.com/vue'
      //     },
      //     {
      //       name: 'pz-pui-alpha',
      //       var: 'pz-pui-alpha',
      //       // path: 'dist/vue.runtime.min.js'
      //       prodUrl: 'https://unpkg.com/pz-pui-alpha'
      //     }
      //   ],
      //   publicPath: '/node_modules'
      // }),

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
      
      new PurgecssPlugin({
        paths: glob.sync([
          path.join(__dirname, './src/index.html'),
          path.join(__dirname, './**/*.vue'),
          path.join(__dirname, './src/**/*.js')
        ])
      }),
    ]
  },
  chainWebpack: config => {
 
    //config.optimization.delete('splitChunks')
    if (process.env.NODE_ENV === "production") {
      config.plugin('html').tap((args) => {
        args[0].minify.collapseWhitespace = false
        args[0].minify.removeComments = false
        return args
      })
    }

  },
  pluginOptions: {
    externals: {
      common: [
          {
              id: 'vue',
              assets: 'https://unpkg.com/vue@2.6.10/dist/vue.js',
              global: 'Vue'
          }
      ]
    }
  },
  transpileDependencies: [
    /\bvue-awesome\b/
  ]
}


