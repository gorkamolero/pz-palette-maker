<template>
  <UpploadVue to="/image" class="pz card pointer" @uploaded="onUpload" :settings="uppload.settings">
    <pui-icon icon="image" :scale="4"/>
    <span>Choose magically from image</span>
  </UpploadVue>
</template>

<script>
import router from '@/router'
import { mapGetters, mapMutations } from 'vuex'
import { dom } from '@fortawesome/fontawesome-svg-core'

// Lazy loading uppload
const UpploadVue = () => import( /* webpackChunkName: "second-load" */ 'uppload-vue')

dom.watch()

export default {
  components: {
    UpploadVue,
  },
  data: () => ({
    uppload: {
      settings: {
        ignoreFontAwesome: true,
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
    // debugger
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
.uppload-modal {
  font-size: 90%;
  &, * { font-family: 'Europa', sans-serif; }
  #dragDropElement { padding: 5rem !important; }
  svg { display: none; }
}

.widget ~ .uppload-bg.visible::after { display: none; } 
</style>
