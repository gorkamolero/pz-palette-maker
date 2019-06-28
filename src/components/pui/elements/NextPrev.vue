<template>
  <component :is="dynamicComp" class="NextPrev" :to="to" :class="{'reverse': prev}" :style="position">
    <slot />

    <puiButton fab size="small">
      <v-icon color="white" :name="icon" />
    </puiButton>
  </component>
</template>

<script>

export default {
  props: {
    prev: Boolean,
    next: Boolean,
    icon: String,
    to: String,
    top: Boolean,
    right: Boolean,
    bottom: Boolean,
    left: Boolean,
    outside: Boolean
  },
  computed: {
    dynamicComp () {
      return this.to ? 'router-link' : 'div'
    },
    position () {
      const space = 'var(--space);'
      
      return `
        ${this.top ? `top: ${space}` : ''}
        ${this.right ? `right: ${space}` : ''}
        ${this.bottom ? `bottom: ${space}` : ''}
        ${this.left ? `left: ${space}` : ''}
      `.replace(/\s+/g, '')
    },
  }
}
</script>

<style lang="scss">
  .NextPrev {
    position: absolute;
    display: flex;
    align-items: center;

    &, * { cursor: pointer; }
    &:not(.reverse) {
      > * + * { margin-left: var(--space-s); }
    }

    &.reverse {
      flex-direction: row-reverse;
      > * + * { margin-right: var(--space-s); }
    }
    button { z-index: 1; }
  }
</style>
