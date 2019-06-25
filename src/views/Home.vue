<template>
  <nav class="step">
    <router-link class="card pointer" to="/choose-one-color">
      <vs-icon size="80px" icon="invert_colors" />
      <span>One Color</span>
    </router-link>

    <template v-if="!$route.meta.split">
      <router-link to="/multi-color" class="card pointer">
        <vs-icon size="80px" icon="color_lens" />
        <span>Multiple Colors</span>
      </router-link>
    </template>
    
    <div class="card pointer vertical" v-else>
      <UpploadVue to="/image" class="card pointer" @uploaded="onUpload" :settings="settings">
        <vs-icon size="60px" icon="color_lens" />
        <span>Choose magically from image</span>
      </UpploadVue>

      <router-link to="/choose-multiple-colors" class="card pointer">
        <vs-icon size="60px" icon="new_releases" />
        <span>Choose your own</span>
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
    uploaded: false,
    colorIsSet: false,
    color: '',
    settings: {
      minimumDelay: 2000,
      uploadFunction: file => (
        new Promise((resolve, reject) => {
          let url = URL.createObjectURL(file)
          resolve(url)
        })
      )
    }
  }),
  mounted () {
    this.colorIsSet = false
  },
  methods: {
    ...mapMutations(['setIMG']),
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
.pz-palette-maker {
  position: relative;
  font-size: 14px;

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

  .uppload-branding {
    display: none;
  }
}
</style>
