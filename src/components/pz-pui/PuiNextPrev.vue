<template>
  <component
    :is="dynamicComp"
    class="pui nextPrev"
    :to="to"
    :class="{ reverse: prev }"
    :style="position"
  >
    <slot />

    <PuiButton fab
      size="small"
    >
      <PuiIcon
        color="white"
        :icon="prev ? 'arrow-left' : 'arrow-right'"
      />
    </PuiButton>
  </component>
</template>

<script>
export default {
  name: 'PuiNextPrev',
  props: {
    prev: Boolean,
    next: Boolean,
    icon: String, // eslint-disable-line
    to: String, // eslint-disable-line
    top: Boolean,
    right: Boolean,
    bottom: Boolean,
    left: Boolean,
    outside: Boolean
  },
  computed: {
    dynamicComp() {
      return this.to ? 'router-link' : 'div'
    },
    position() {
      const space = 'var(--space);'

      return `
        ${this.top ? `top: ${space}` : ''}
        ${this.right ? `right: ${space}` : ''}
        ${this.bottom ? `bottom: ${space}` : ''}
        ${this.left ? `left: ${space}` : ''}
      `.replace(/\s+/g, '')
    }
  }
}
</script>

<style lang="scss">
.nextPrev {
  position: absolute;
  display: flex;
  align-items: center;
  cursor: pointer;

  &,
  * {
    cursor: pointer;
  }
  &:not(.reverse) {
    > * + * {
      margin-left: var(--space-s);
    }
  }

  &.reverse {
    flex-direction: row-reverse;
    > * + * {
      margin-right: var(--space-s);
    }
  }
  button {
    z-index: 1;
  }
}
</style>