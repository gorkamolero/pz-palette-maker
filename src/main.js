import Vue from 'vue'
import App from './App.vue'

Vue.config.devtools = true
import PzPuiAlpha from 'pz-pui-alpha'
if (!window.PzPuiAlpha) Vue.use(PzPuiAlpha)


const mountEl = document.querySelector('#pz-palette-maker')

new Vue({
  render: createElement => {
    const context = { props: { ...mountEl.dataset } }
    return createElement(App, context)
  }
}).$mount('#pz-palette-maker')