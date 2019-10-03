<template>
  <div class="pz-palette-wrapper">
    <slot />    
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss">
  .pz-palette-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
</style>