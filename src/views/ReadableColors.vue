<template>
  <section class="allColors">
    <ReadableColorItem v-for="(color, index) in colors" :key="index" :init="color" :index="index" />
    
    <NextPrev
      icon="arrow-right"
      to="/you-made-your-choice"
      bottom right>
      <small>And finally...</small>
    </NextPrev>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import ReadableColorItem from '@/components/ReadableColorItem'

export default {
  components: {
    ReadableColorItem,
  },
  computed: {
    ...mapGetters({
      colors: 'getBaseColors'
    })
  }
}
</script>

<style lang="scss" scoped>
  .allColors {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    article + article { border-top: 1px solid gainsboro; }
  }
</style>