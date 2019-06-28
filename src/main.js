import Vue from 'vue'
import App from './App.vue'
import '@/components/pui/pui-loader'

import vueCustomElement from 'vue-custom-element'
Vue.use(vueCustomElement)
Vue.customElement('pz-palette-maker', App)