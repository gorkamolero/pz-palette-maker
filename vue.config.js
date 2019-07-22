const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  publicPath: '/',
  outputDir: 'dist/editor/vue/pz-palette-maker',
  filenameHashing: false,
  // indexPath: 'index.html',
  pluginOptions: {
    webpackBundleAnalyzer: { openAnalyzer: 'static' },
    externals: isProd ? {
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
          id: 'vue-router',
          assets: [
            {
              path: 'https://unpkg.com/vue-router',
              type: 'js'
            }
          ],
          global: 'VueRouter'
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
    } : {}
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      config.plugin('html').tap((args) => {
        args[0].minify.collapseWhitespace = false
        args[0].minify.removeComments = false
        return args
      })
    }
  }
}