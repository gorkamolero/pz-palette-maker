<template>
  <article class="readable step">
    <div class="card leftie nobg">
      <div class="card-inner">
        <div v-if="!amIReadable()">
          <h1>😤 That's not a <strong>readable</strong> color...</h1>
          <p>Please choose a variant that could work:</p>
          <div class="swatches">
            <swatches :colors="lighterMiniVersions()" inline @input="setTheColor" />
          </div>
        </div>

        <div v-else>
          <h1>💃Success!</h1>
          <p>That's fine for the human eye</p>
        </div>
      </div>

      
    </div>
    <div class="card" :style="{ backgroundColor: color, color: widgetTextColor }">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non scelerisque neque, eget consectetur purus. Suspendisse eget dui magna. Quisque id massa arcu...</p>
    </div>
  </article>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import chroma from 'chroma-js'
import 'vue-swatches/dist/vue-swatches.min.css'
 
export default {
  components: {
    Swatches: () => import(/* webpackChunkName: "color" */ 'vue-swatches')
  },
  props: {
    init: String,
    index: Number
  },
  watch: {
    init () {
      this.initColors()
    }
  },
  data: () => ({
    color: null,
    textColor: null,
    colors: [],
    contrastRatio: 8
  }),
  created () {
    this.initColors()
  },
  methods: {
    initColors() {
      this.color = chroma(this.init)
      this.textColor = chroma(this.widgetTextColor)
    },
    isColorReadable (color) {
      return chroma.contrast(color, this.widgetTextColor) >= this.contrastRatio
    },
    amIReadable() {
      return this.isColorReadable(this.color.hex())
    },
    lighterMiniVersions () {
      if(!this.color) return

      let miniMes = [this.color.hex()]
      let newColor = this.color.brighten()
      
      do {
        newColor = newColor.brighten()
        miniMes.push(newColor.hex())
      } while( !this.isColorReadable(newColor.hex()) )
      
      return miniMes
    },
    setTheColor(color) {
      this.setColorByIndex({color, index: this.index})
    },
    ...mapMutations([
      'setSingleBaseColor',
      'setColorByIndex'
    ]),
  },
  computed: {
    widgetTextColor() { return this.$store.state.widgetTextColor },
  }
}
</script>

<style lang="scss">
.pz.pz-palette-maker {
  .many {
    display: flex;
  }
  .leftie {
    text-align: left;
    align-items: flex-start;
  }
  .nobg:hover { background: transparent; cursor: normal; }
  .readable .card {
    overflow: unset;
  }
  .readable {
    min-height: 120px;
  }
  .vue-swatches__wrapper {
    padding: 0 !important;
  }
}
</style>
