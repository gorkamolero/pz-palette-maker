<template>
  <nav class="step">
    <router-link class="card pointer" to="/choose-one-color">
      <pui-icon icon="tint" :scale="4"/>
      <span>Start with one Color</span>
    </router-link>
    
    <div class="card pointer vertical">
      <ImageUploader />

      <router-link to="/choose-multiple-colors" class="card pointer">
        <pui-icon icon="paint-brush" :scale="4"/>
        <span>Create your own palette</span>
      </router-link>
    </div>
  </nav>
</template>

<script>
import router from '@/router'
import { mapGetters, mapMutations } from 'vuex'

// Lazy loading uppload
import ImageUploader from '@/components/ImageUploader'

export default {
  components: {
    ImageUploader,
  },
}
</script>

<style lang="scss"></style>
