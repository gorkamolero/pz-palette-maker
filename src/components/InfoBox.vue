<template>
  <div class="infobox">
    <slot></slot>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss">
  .infobox {
    padding: var(--space);
    border-bottom: 1px solid gainsboro;
    min-height: 5em;
    
    display: flex;
    flex-direction: column;
    justify-content: center;

    user-select: none;
  }
</style>