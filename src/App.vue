<template>
  <div class="pz-wrap" :class="layout">
    <div class="pz pz-palette-maker">
      <PZBoiler style="display: none;" />
      <PuiNextPrev
        prev
        v-if="!$route.meta.hideArrow"
        icon="prev"
        @click.native="goBack"
        top left
        style="z-index: 9;">
        <small>Take me back</small>
      </PuiNextPrev>

      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import store from './store'
import { mapMutations } from 'vuex'

import PZBoiler from '@bit/pickzen.pui.core.pz-boiler/PZBoiler'

import '@/tempstyles.scss'

export default {
  router,
  store,
  name: 'pz-palette-maker',
  components: {
    PZBoiler
  },
  props: {
    layout: {
      type: String,
      default: 'widget'
    },
    colors: String,
    slides: {
      type: String,
      default: "10"
    },
    onchange: String,
    mode: {
      type: String,
      default: "css"
    }
  },
  mounted() {
    this.setGlobalMethod(this.onchange)
    this.setMode(this.mode)
    this.setNumOfSlides(Number(this.slides))

    if(window.pzPalette) {
      window.pzPalette.numSlides && this.setNumOfSlides(Number(window.pzPalette.numSlides))
      console.log('SET NUMBEr')

      if(window.pzPalette.colors === undefined) return

      this.setNumOfSlides(window.pzPalette.colors.length)
      this.setBaseColors(window.pzPalette.colors)
      router.push('/readable-colors')
    }
  },
  watch: {
    slides: function() {
      this.setNumOfSlides(Number(this.slides))
    }
  },
  methods: {
    ...mapMutations(['setBaseColors', 'setNumOfSlides', 'setGlobalMethod', 'setMode']),
    goBack() { router.go(-1) }
  }
} 
</script>

<style lang="scss">
body.vue {
  margin: 0;
}
.pz-wrap {
  width: 100%;
  height: 100vh;
  overflow: hidden;

  position: relative;

  &.widget {
    height: 0;
    padding-bottom: 80%;
  }
}
.pz-palette-maker {
  position: absolute;
  height: 100%; width: 100%;
  text-align: center;
  
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  .standalone & {
    width: 100%;
    max-width: 780px;
    height: 480px;
    margin: 0 auto;
    border: 1px solid gainsboro;
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
