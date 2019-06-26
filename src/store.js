import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const initState = () => ({
  img: '',
  slides: 10,
  baseColor: '#808080',
  baseColors: [],
  widgetTextColor: 'black',
  scale: [],
  onChange: ''
})

const state = initState()

const store = {
  state,
  mutations: {
    setIMG: (state, url) => Vue.set(state, 'img', url),
    setSingleBaseColor: (state, color) => Vue.set(state, 'baseColor', color),
    setColorByIndex: (state, { color, index }) => state.baseColors.splice(index, 1, color),
    addBaseColor: (state, color) => state.baseColors.push(color),
    removeBaseColor: (state, index) => Vue.delete(state.baseColors, index),
    setBaseColors: (state, array) => array.forEach((color, index) => Vue.set(state.baseColors, index, color)),
    setNumOfSlides: (state, number) => Vue.set(state, 'slides', number),
    setGlobalMethod: (state, func) => Vue.set(state, 'onChange', func),
    setFinalScale: (state, scale) => scale.forEach((color, index) => Vue.set(state.scale, index, color)),
    resetAllColors: ({baseColors}) => {
      do {
        baseColors.pop()
        console.log(baseColors)
      } while (baseColors.length > 0)
    },
  },
  getters: {
    getIMG: state => state.img,
    getBaseColor: state => state.baseColor,
    getBaseColors: state => state.baseColors,
    getNumOfSlides: state => state.slides,
    getGlobalMethod: state => state.onChange,
    getFinalScale: state => state.scale
  },
  actions: {
    
  }
}

window.store = store

export default new Vuex.Store({
  ...store
})
