const webpack = require('webpack');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const glob = require('glob-all');
const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const WebpackCdnPlugin = require('webpack-cdn-plugin');

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
      }),
      //new HtmlWebpackPlugin(),
      // new WebpackCdnPlugin({
      //   modules: [
      //     {
      //       name: 'vue',
      //       var: 'Vue',
      //       path: '/'
      //     },
      //     {
      //       name: 'pz-pui-alpha',
      //       var: 'PzPuiAlpha',
      //       path: 'umd/index.min.js'
      //     },
      //     // {
      //     //   name: 'vue-router',
      //     //   var: 'VueRouter',
      //     //   path: 'dist/vue-router.min.js'
      //     // },
      //     // {
      //     //   name: 'vuex',
      //     //   var: 'Vuex',
      //     //   path: 'dist/vuex.min.js'
      //     // }
      //   ],
      //   publicPath: '/node_modules'
      // })
    ]
  },
  chainWebpack: config => {
    // config.externals({
    //   ...config.get('externals'),
    //   //'vue': 'Vue',
    //   'pz-pui-alpha': 'pz-pui-alpha'
    // })
 
    //config.optimization.delete('splitChunks')
    if (process.env.NODE_ENV === "production") {
      config.plugin('html').tap((args) => {
        args[0].minify.collapseWhitespace = false
        args[0].minify.removeComments = false
        return args
      })
    }

  },
  transpileDependencies: [
    /\bvue-awesome\b/
  ]
}


