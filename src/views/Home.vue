<template>
  <nav class="step">
    <router-link class="card pointer" to="/choose-one-color">
      <pui-icon icon="tint" :scale="4"/>
      <span>Start with one Color</span>
    </router-link>

    <router-link to="/multi-color" class="card pointer">
      <pui-icon icon="palette" :scale="4"/>
      <span>Start with multiple Colors</span>
    </router-link>
  </nav>
</template>

<script>
import { mapMutations } from 'vuex'

export default {

}
</script>

<style lang="scss">
.pz.pz-palette-maker {
  color: var(--text-light);
  font-size: 14px;

  a, a:visited { color: inherit; text-decoration: none; }
  button { font-family: inherit; }

  .step {
    height: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .card {
    padding: var(--space);
    height: 100%;
    flex: 1; flex: 0 0 50%;
    display: flex;
    flex-direction: column;
    align-items: safe center;
    justify-content: safe center;
    position: relative;
    user-select: none;
    overflow: auto;

    transition: background-color var(--trans);
    
    &.pointer {
      cursor: pointer;
      &:not(.vertical):hover, .card:hover { background: whitesmoke; }
    }
    &.vertical {
      flex-direction: column;
      padding: 0;
      .card {
        flex: 1;
        width: 100%;
      }
      .card + .card {
        border-left: none;
        border-top: 1px solid gainsboro;
      }
    }
  }
  .card + .card { border-left: 1px solid gainsboro; }

  .pointer {
    cursor: pointer;
  }

  h2 {
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  h1 {
    font-size: 1.2em;
    font-weight: 300;
    margin-bottom: .3rem;
  }
}
.uppload-branding { display: none !important; }
.uppload-modal .center-middle {
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
