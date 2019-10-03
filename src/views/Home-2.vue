<template>
  <Wrapper>
    <InfoBox>
      <p>Welcome to our Palette Generator</p>
      <p>This tool will help you generate a color palette to match your Quiz.</p>
    </InfoBox>
    
    <nav class="step">
      <router-link to="/choose-multiple-colors" class="card pointer">
        <pui-icon icon="paint-brush" :scale="4"/>
        <span>Create your own palette</span>
      </router-link>
      
      <ImageUploader />
    </nav>
  </Wrapper>
</template>

<script>
import router from '@/router'
import { mapGetters, mapMutations } from 'vuex'

// Lazy loading uppload
import ImageUploader from '@/components/ImageUploader'
import InfoBox from '@/components/InfoBox'
import Wrapper from '@/components/Wrapper'

export default {
  components: {
    ImageUploader,
    Wrapper,
    InfoBox
  },
}
</script>

<style lang="scss"></style>
