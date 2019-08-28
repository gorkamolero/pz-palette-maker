const omit = require('lodash.omit')

const isProd = process.env.NODE_ENV === 'production'
const isNetlify = process.env.NODE_ENV === 'netlify'

const myExports = {
  publicPath: '/editor/vue/pz-palette-maker/',
  outputDir: 'dist/editor/vue/pz-palette-maker',
  filenameHashing: false,
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