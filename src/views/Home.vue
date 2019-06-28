<template>
  <nav class="step">
    <router-link class="card pointer" to="/choose-one-color">
      <v-icon name="tint" scale="4"/>
      <span>One Color</span>
    </router-link>

    <template v-if="!$route.meta.split">
      <router-link to="/multi-color" class="card pointer">
        <v-icon name="palette" scale="4"/>
        <span>Multiple Colors</span>
      </router-link>
    </template>
    
    <div class="card pointer vertical" v-else>
      <UpploadVue to="/image" class="card pointer" @uploaded="onUpload" :settings="uppload.settings">
        <v-icon name="image" scale="4"/>
        <span>Choose magically from image</span>
      </UpploadVue>

      <router-link to="/choose-multiple-colors" class="card pointer">
        <v-icon name="paint-brush" scale="4"/>
        <span>Create your own palette</span>
      </router-link>
    </div>
  </nav>
</template>

<script>
import router from '@/router'
import UpploadVue from 'uppload-vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    UpploadVue,
  },
  data: () => ({
    uppload: {
      settings: {
        minimumDelay: 2000,
        uploadFunction: file => (
          new Promise((resolve, reject) => {
            let url = URL.createObjectURL(file)
            resolve(url)
          })
        )
      }
    }
  }),
  mounted () {
    this.resetAllColors()
  },
  methods: {
    ...mapMutations(['setIMG', 'resetAllColors']),
    onUpload(url) {
      this.setIMG(url)
      router.push('/image')
    },
  },
  computed: {
    ...mapGetters({
      url: 'getIMG'
    })
  }
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
  position: relative;
}
.uppload-branding { display: none !important; }
.uppload-modal .center-middle {
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
