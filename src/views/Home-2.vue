<template>
  <nav class="step">
    <router-link class="card pointer" to="/choose-one-color">
      <pui-icon icon="tint" :scale="4"/>
      <span>One Color</span>
    </router-link>
    
    <div class="card pointer vertical">
      <UpploadVue to="/image" class="card pointer" @uploaded="onUpload" :settings="uppload.settings">
        <pui-icon icon="image" :scale="4"/>
        <span>Choose magically from image</span>
      </UpploadVue>

      <router-link to="/choose-multiple-colors" class="card pointer">
        <pui-icon icon="paint-brush" :scale="4"/>
        <span>Create your own palette</span>
      </router-link>
    </div>
  </nav>
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
