<template>
  <PZBoiler id="app" class="pz-palette-maker">

    <NextPrev
       v-if="!$route.meta.hideArrow"
      icon="arrow_back"
      @click="goBack"
      top left>
      <small>Take me back</small>
    </NextPrev>

    <router-view></router-view>
  </PZBoiler>
</template>

<script>
import PZBoiler from '@/components/core/PZBoiler'
import router from '@/router'
import store from './store'
import '@/tempstyles.scss'

export default {
  router,
  store,
  name: 'PZPaletteMaker',
  components: {
    PZBoiler,
  },
  methods: {
    goBack() { router.go(-1) }
  }
}
</script>

<style lang="scss">
body {
  display: flex;
  align-items: center;
  justify-content: center;
}
#app.pz-palette-maker {
  text-align: center;
  width: 720px;
  height: 480px;
  margin: 0 auto;
  border: 1px solid gainsboro;
  
  display: flex;
  align-items: center;
  justify-content: center;

  
  .backButton {
    position: absolute;
    left: 0; top: -10px;
    transform: translateY(-100%);
    display: flex;
    align-items: center;
    > * + * { margin-left: var(--space-s) }
  }
}
</style>
