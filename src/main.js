import Vue from 'vue'
import App from './App.vue'

import vueCustomElement from 'vue-custom-element'
Vue.use(vueCustomElement)
Vue.customElement('pz-palette-maker', App)

/* new Vue({
  render: h => h(App),
}).$mount('#pz-palette-maker')
 */