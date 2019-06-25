<template>
  <PZBoiler id="app" class="pz-palette-maker">
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
import PZBoiler from '@/components/core/PZBoiler'
import router from '@/router'
import '@/tempstyles.scss'

export default {
  name: 'app',
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
