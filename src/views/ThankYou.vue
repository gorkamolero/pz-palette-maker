<template>
  <div>
    <h1>Thank you!</h1>
    <img src="../assets/circular-sunglasses.png" alt="">
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import chroma from 'chroma-js'
import styleInject from 'style-inject'

export default {
  mounted () {
    window.pzPalette = this.scss

    const returner = this.getMode === 'css' ? this.scss : this.getFinalScale

    if( (window.vuebridge && window.vuebridge[this.getGlobalMethod]) ) {
      window.vuebridge[this.getGlobalMethod](returner)
    } else {
      const msg =  `There is no global method called '${this.getGlobalMethod}'.
Please contact your organization's Isidro ¯\_(ツ)_/¯
Colors: ${this.getFinalScale}`
      console.warn(msg)
    }
  },
  computed: {
    ...mapGetters(['getFinalScale', 'getGlobalMethod', 'getMode']),
    scss () {
      return this.getFinalScale.map((color, i) => (
        `[data-slide-number="${i}"] {
            --slide-color: ${color};
            --slide-color-blend: ${this.lighten(color)};
          }`
        )
      ).join('')
    }
  },
  methods: {
    lighten (color) { return chroma(color).brighten(1) }
  }
}
</script>