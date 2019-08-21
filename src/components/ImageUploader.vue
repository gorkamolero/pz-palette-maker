<template>
  <UpploadVue to="/image" class="pz card pointer" @uploaded="onUpload" :settings="uppload.settings">
    <pui-icon icon="image" :scale="4"/>
    <span>Choose magically from image</span>
  </UpploadVue>
</template>

<script>
import router from '@/router'
import { mapGetters, mapMutations } from 'vuex'

// Lazy loading uppload
const UpploadVue = () => import( /* webpackChunkName: "second-load" */ 'uppload-vue')

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

<style lang="scss"></style>
