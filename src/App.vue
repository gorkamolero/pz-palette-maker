<template>
  <PZBoiler id="app" class="pz-palette-maker" :class="layout">
    <div class="backButton" v-if="!$route.meta.hideArrow">
      <vs-button
      @click="goBack"
      radius color="#f8981d" gradient-color-secondary="#ffb85d" type="gradient" icon="arrow_back" />
      <small>Take me back</small>
    </div>
    <router-view></router-view>
  </PZBoiler>
</template>

<script>
import router from '@/router'
import store from './store'

import { mapMutations } from 'vuex'

import PZBoiler from '@/components/core/PZBoiler'
import '@/tempstyles.scss'

export default {
  router,
  store,
  name: 'app',
  components: { PZBoiler, },
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
    const colors = this.colors.split(',').map(c => c.trim())
    let slides = Number(this.slides)

    this.setGlobalMethod(this.onChange)
    this.setNumOfSlides(slides)

    // Making sure we have a color array before proceeding 
    if (Array.isArray(colors) && colors.length > 0) {
      this.setBaseColors(colors)
      router.push('/choose-multiple-colors')
    }    
  },
  methods: {
    ...mapMutations(['setBaseColors', 'setNumOfSlides', 'setGlobalMethod']),
    goBack() { router.go(-1) }
  }
} 
</script>

<style lang="scss">

#app.pz-palette-maker {
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

  
  .backButton {
    z-index: 9;
    position: absolute;
    left: 0; top: 0;
    padding: var(--space-s);
    display: flex;
    align-items: center;
    > * + * { margin-left: var(--space-s) }
  }
}
</style>
