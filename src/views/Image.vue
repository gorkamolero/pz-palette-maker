<template>
  <article class="step image">
    <div class="card">
      <div class="card-inner color-swatch-wrap">
        <h1>Please de-select to reach a maximum of four</h1>
        <template v-for="(color, index) in swatches">
          <div class="color-swatch" :class="{active: isActive(color.hex)}" @click="toggleInactive(color.hex)" :key="index">
            <div class="color" :style="{backgroundColor: color.hex}"></div>
            <span>{{ color.hex }}</span>
          </div>
        </template>
      </div>
    </div>
    
    <div class="card">
      <img class="original" ref="image" :src="img" alt="">
    </div>

    <div class="next below" v-if="this.minReached">
      <small>I love these colors. Let's go!</small>
      <vs-button @click="setNGo" radius color="#f8981d" gradient-color-secondary="#ffb85d" type="gradient" icon="arrow_forward" />
    </div>
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

<style>
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
  .next.below {
    bottom: 0; right: 0;
    padding: var(--space);
    transform: translateY(100%)
  }
</style>
