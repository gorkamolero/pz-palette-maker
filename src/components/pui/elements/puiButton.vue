<template>
  <UiFab v-if="fab" :size="size" class="pui">
    <slot />
  </UiFab>
</template>

<script>
import 'keen-ui/src/bootstrap'
import UiFab from 'keen-ui/lib/UiFab'

export default {
  props: {
    size: {
      type: String
    },
    fab: {
      type: Boolean
    }
  },
  components: {
    UiFab
  }
}
</script>

<style lang="scss">
  .pui.ui-fab {
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.05), 0 2px 10px 0 rgba(0, 0, 0, 0.03);
    background: linear-gradient(30deg, rgb(248, 152, 29) 0%, rgb(255, 184, 93) 100%);
    transition: all var(--trans);
    &:hover:not(:active) {
      box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.0575), 0 6px 20px 0 rgba(0, 0, 0, 0.05);
      transform: translateY(-2px);
    }
    &:active {

    }
  }
</style>
