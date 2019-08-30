
<template>
  <button class="pui button fab size-small">
    <div>
      <slot />
    </div>
  </button>
</template>

<script>
export default {
  name: 'PuiButton',
  props: {
    size: {
      type: String,
      default: 'mid'
    },
    fab: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // class="pui button"
    // :class="[classer]"
    /* classer: self => ({
      'size-small': self.size === 'small',
      'size-medium': ['medium', 'mid'].includes(self.size),
      'size-large': ['big', 'large', 'huge'].includes(self.size),
      fab: self.fab
    }) */
  }
}
</script>

<style lang="scss">
.pui {
  &.button {
    all: unset;
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: linear-gradient(
      30deg,
      rgb(248, 152, 29) 0%,
      rgb(248, 152, 29) 50%,
      rgb(255, 184, 93) 100%
    );

    &.fab {
      border-radius: 100%;
      box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.05),
        0 2px 10px 0 rgba(0, 0, 0, 0.03);
      transition: all var(--trans);

      &:active,
      &:hover:active {
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1),
          0 2px 10px 0 rgba(0, 0, 0, 0.12);
      }

      &:hover:not(:active) {
        box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.0575),
          0 6px 20px 0 rgba(0, 0, 0, 0.05);
        transform: translateY(-2px);
      }

      svg {
        transform: translateY(1px);
      }

      &.size {
        &-small {
          width: var(--button-s);
          height: var(--button-s);
        }
      }
    }
  }
}
</style>