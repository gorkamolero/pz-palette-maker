<template>
  <nav class="step" data-v-step="0">
    <router-link
      to="/choose-multiple-colors"
      class="card pointer"
    >
      <pui-icon data-v-step="1" icon="paint-brush" :scale="4"/>
      <span >Create your own palette</span>
    </router-link>
    
    <ImageUploader />

    <v-tour name="myTour" :steps="steps" />
  </nav>
</template>

<script>
import router from '@/router'
import { mapGetters, mapMutations } from 'vuex'

import ImageUploader from '@/components/ImageUploader'

export default {
  data () {
    return {
      steps: [
        {
          target: '[data-v-step="0"]',
          content: `<h1>Welcome to our <strong>Colorpicker</strong>!</h1>
          <br>We will help you create a beautiful palette to match your brand and apply it to your slides.`,
          params: {
            placement: 'center'
          }
        },
        {
          target: '[data-v-step="1"]',
          content: `Start by either choosing your own colors...`,
          params: {
            placement: 'top-left'
          }
        },
        {
          target: '[data-v-step="2"]',
          content: 'Or by uploading an image and extracting colors from it',
          params: {
            placement: 'top-end'
          }
        }
      ]
    }
  },
  mounted () {
    this.$tours['myTour'].start()
  },
  components: {
    ImageUploader,
  },
}
</script>

<style lang="scss">
  .v-tour {
    &:before {
      content: '';
      position: absolute;
      top: 0; left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, .3);
    }
  }
  .v-step {
    &[x-placement="center"] {
      transform-origin: center center;
      top: 50% !important; left: 50% !important;
      transform: translate(-50%, -50%) !important;
    }
  }
</style>
