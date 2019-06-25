<template>
  <section class="allColors">
    <ReadableColorItem v-for="(color, index) in colors" :key="index" :init="color" :index="index" />
    
    <router-link  to="/you-made-your-choice" class="next above">
      <small>And finally...</small>
      <vs-button radius color="danger" type="gradient" icon="arrow_forward" />
    </router-link>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import ReadableColorItem from '@/components/ReadableColorItem'
export default {
  components: {
    ReadableColorItem
  },
  computed: {
    ...mapGetters({
      colors: 'getBaseColors'
    })
  }
}
</script>

<style lang="scss">
  .allColors {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    article + article { border-top: 1px solid gainsboro; }
  }
  .next.above {
        top: 0;
    transform: translateY(-100%);
    z-index: 999;
    right: 0;
    height: 60px;
  }
</style>