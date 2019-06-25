import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = {
  state: {
    mode: '',
    img: '',
    baseColor: '#EEE',
    baseColors: [],
    widgetTextColor: 'black',
    colors: []
  },
  mutations: {
    setMode: (state, color) => Vue.set(state, 'mode', color),
    setIMG: (state, url) => Vue.set(state, 'img', url),
    setSingleBaseColor: (state, color) => Vue.set(state, 'baseColor', color),
    setColorByIndex: (state, { color, index }) => state.baseColors.splice(index, 1, color),
    addBaseColor: (state, color) => state.baseColors.push(color),
    setBaseColors: (state, array) => array.forEach((color, index) => Vue.set(state.baseColors, index, color))
  },
  getters: {
    getIMG: state => state.img,
    getBaseColor: state => state.baseColor,
    getBaseColors: state => state.baseColors,
    getMode: state => state.mode,
  }
}

window.store = store

export default new Vuex.Store({
  ...store
})
