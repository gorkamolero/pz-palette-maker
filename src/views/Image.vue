<template>
  <article class="step image">
    <div class="card">
      <div class="card-inner color-swatch-wrap">
        <h1>❕ Please de-select to reach a maximum of four</h1>
        <template v-for="(color, index) in swatches">
          <div class="color-swatch" :class="{active: isActive(color.hex)}" @click="toggleInactive(color.hex)" :key="index">
            <div class="color" :style="{backgroundColor: color.hex}"></div>
            <span>{{ color.hex }}</span>
          </div>
        </template>
      </div>
    </div>
    
    <div class="card">
      <img v-if="img" class="original" ref="image" :src="img" alt="">
    </div>
    
    <PuiNextPrev
      v-if="this.minReached"
      icon="next"
      @click.native="setNGo"
      bottom right>
      <small>I love these colors. Let's go!</small>
    </PuiNextPrev>
  </article>
</template>

<script>
import router from '@/router'
import { mapMutations } from 'vuex'
import * as Vibrant from 'node-vibrant'

export default {
  data: () => ({
    swatches: null,
    inactiveList: []
  }),
  mounted() {
    Vibrant.from(this.$refs.image)
      .getPalette()
      .then((palette) => this.swatches = palette)
  },
  methods: {
    ...mapMutations(['setBaseColors']),
    toggleInactive(color) {
      if(this.isInactive(color)) {
        this.$delete(this.inactiveList, this.inactiveList.indexOf(color))
      } else {
        this.inactiveList.push(color)
      }
      
    },
    isInactive (color) { return this.inactiveList.includes(color) },
    isActive (color) { return !this.inactiveList.includes(color) },
    activeColors() {
      if(!this.swatches) return []
      else return Object.keys(this.swatches)
                    .map(key => this.swatches[key].hex)
                    .filter(color => this.isActive(color))
    },
    setNGo () {
      this.setBaseColors(this.activeColors())
      router.push('/choose-multiple-colors')
    },
  },
  computed: {
    img () { return this.$store.state.img },
    activeNum() {
      if(this.swatches) return Object.keys(this.swatches).length - this.inactiveList.length
      else return false
    },
    minReached() { return this.activeNum <= 4 }
  }
}
</script>

<style lang="scss">
.pz-palette-maker {
  .original {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .color-swatch.active {
    border: 2px solid black;
  }
}
</style>
