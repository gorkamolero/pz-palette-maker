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
    onChange: String
  },
  created() {
    
    let slides = Number(this.slides)

    this.setGlobalMethod(this.onChange)
    this.setNumOfSlides(slides)

    // Making sure we have a color array before proceeding 
    if(this.colors) {
      const colors = this.colors.split(',').map(c => c.trim())
      if (Array.isArray(colors) && colors.length > 0) {
        this.setBaseColors(colors)
        router.push('/choose-multiple-colors')
      }
    }
  },
  methods: {
    ...mapMutations(['setBaseColors', 'setNumOfSlides', 'setGlobalMethod']),
    goBack() { router.go(-1) }
  }
} 
</script>

<style lang="scss">
.pz-wrap {
  min-width: 720px;
  min-height: 480px;
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
    width: 720px;
    height: 480px;
    margin: 0 auto;
    border: 1px solid gainsboro;
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
