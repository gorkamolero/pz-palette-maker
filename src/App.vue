<template>
  <div class="pz-wrap">
    <div class="pz pz-palette-maker" :class="layout">
      <PZBoiler style="display: none;" />
      <pui-next-prev
        prev
        v-if="!$route.meta.hideArrow"
        icon="arrow-left"
        @click.native="goBack"
        top left
        style="z-index: 1;">
        <small>Take me back</small>
      </pui-next-prev>

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
  created() {
    let slides = Number(this.slides)

    this.setGlobalMethod(this.onchange)
    this.setMode(this.mode)
    this.setNumOfSlides(slides)

    // Making sure we have a color array before proceeding 
    if(this.colors) {
      const colors = this.colors.split(',').map(color => color.trim())
      
      if (Array.isArray(colors) && colors.length > 0) {
        this.setBaseColors(colors)
        router.push('/choose-multiple-colors')
      }
    }
  },
  methods: {
    ...mapMutations(['setBaseColors', 'setNumOfSlides', 'setGlobalMethod', 'setMode']),
    goBack() { router.go(-1) }
  }
} 
</script>

<style lang="scss">
.pz-wrap {
  width: 100%;
  min-width: 700px;
  min-height: 100vh;
  position: relative;
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

  &.standalone {
    width: 100%;
    height: 480px;
    margin: 0 auto;
    border: 1px solid gainsboro;
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
