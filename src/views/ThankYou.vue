<template>
  <div>
    <h1>Thank you!</h1>
    <p>Instructions on command line</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import chroma from 'chroma-js'
import styleInject from 'style-inject'

export default {
  mounted () {
    window.parent.pzPalette = {
      scss: this.scss,
      scale: this.getFinalScale,
      colors: this.getFinalScale
    }

    const returner = this.getMode === 'css' ? this.scss : this.getFinalScale

    if( (window.parent.vuebridge && window.parent.vuebridge[this.getGlobalMethod]) ) {
      window.parent.vuebridge[this.getGlobalMethod](returner)
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