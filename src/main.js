import Vue from 'vue'
import App from './App.vue'

import PzPuiAlpha from 'pz-pui-alpha/cjs/index.js'
// const PzPuiAlpha = () => import ( /* webpackChunkName: "pz-other" */ 'pz-pui-alpha/cjs/index.js')
Vue.use(PzPuiAlpha)

import vueCustomElement from 'vue-custom-element'
Vue.use(vueCustomElement)
Vue.customElement('pz-palette-maker', App)

// new Vue({
//   render: h => h(App),
// }).$mount('#pz-palette-maker') 