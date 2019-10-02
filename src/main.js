import Vue from 'vue'
import App from './App.vue'
import pzPuiAlpha from './components/pz-pui'

import VueTour from 'vue-tour'
require('vue-tour/dist/vue-tour.css')

Vue.config.devtools = true

pzPuiAlpha.forEach(component => Vue.component(component.name, component))

const mountEl = document.querySelector('#pz-palette-maker')
Vue.use(VueTour)


new Vue({
  render: createElement => {
    const context = { props: { ...mountEl.dataset } }
    return createElement(App, context)
  }
}).$mount('#pz-palette-maker')