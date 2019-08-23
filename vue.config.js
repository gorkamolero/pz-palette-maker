const omit = require('lodash.omit')

const isProd = process.env.NODE_ENV === 'production'
const isNetlify = process.env.NODE_ENV === 'netlify'

const myExports = {
  // publicPath: '/editor/vue/pz-palette-maker/',
  // outputDir: 'dist/editor/vue/pz-palette-maker',
  filenameHashing: false,
  // indexPath: 'index.html',
  pluginOptions: {
    //webpackBundleAnalyzer: { openAnalyzer: 'static' },
    externals: {
      common: [
        {
            id: 'vue',
            assets: [
              {
                path: 'https://unpkg.com/vue',
                type: 'js'
              }
            ],
            global: 'Vue'
        },
        {
            id: 'vuex',
            assets: [
              {
                path: 'https://unpkg.com/vuex',
                type: 'js'
              }
            ],
            global: 'Vuex'
        },
        {
          id: 'pz-pui-alpha',
          assets: [
            {
              path: 'https://unpkg.com/pz-pui-alpha',
              type: 'js'
            }
          ],
          global: 'index'
        },
      ]
    }
  },
  chainWebpack: config => {
    if (isProd || isNetlify) {
      config.plugin('html').tap((args) => {
        args[0].minify.collapseWhitespace = false
        args[0].minify.removeComments = false
        return args
      })
    }
  }
}

module.exports = !isNetlify ? myExports : omit(omit, ['publicPath', 'outputDir'])