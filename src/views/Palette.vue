<template>
  <article class="final step">
    <div class="card leftie">
      <div class="card-inner">
        <h1>🎨 🎉 Ready! <span v-if="multi">Now rearrange to your liking! </span></h1>
        <small>Your color palette is automatically calculated from the number of slides in your quiz.</small>

        <br><br>
        
        <SlickList class="flex" axis="x" lockAxis="x" v-model="colors">
          <SlickItem v-for="(color, index) in colors" :index="index" :key="index">
            <div class="color-swatch">
              <div class="color" :style="{backgroundColor: color}"></div>
              <span></span>
            </div>
          </SlickItem>
        </SlickList>

        <ul class="options" v-if="multi">
          <li><vs-checkbox v-model="bezier">Smooth transition</vs-checkbox></li>
          <li><vs-checkbox v-model="lightness">Correct Light</vs-checkbox></li>
        </ul>

        <footer style="margin-top: auto;">
          <small>
            Many thanks to <a href="https://twitter.com/driven_by_data">Gregor</a> from <a href="https://vis4.net" target="_blank">vis4</a> for the idea
          </small>
        </footer>
      </div>

    </div>
    <div class="card">
      <div class="color-scale">
        <template v-for="(color, index) in colorScale()">
          <div v-if="colorScale().length" :key="index" class="color-swatch">
            <div class="color" :class="{border: color === 'white'}" :style="{backgroundColor: color}"></div>
          </div>
        </template>
      </div>
      <div class="commit">
        <p>I'm happy with this palette. </p>
      </div>
    </div>
    
    <div to="/you-made-your-choice" class="next">
      <small>Let's go!</small>
      <vs-button radius color="#f8981d" gradient-color-secondary="#ffb85d" type="gradient" icon="arrow_forward" />
    </div>
  </article>
</template>

<script>
import { mapGetters } from 'vuex'
import { SlickList, SlickItem } from 'vue-slicksort'
import chroma from 'chroma-js'

export default {
  data: () => ({
    bezier: true,
    lightness: true,
    colorNumber: 15
  }),
  components: {
    SlickItem,
    SlickList
  },
  computed: {
    colors: {
      get () {
        return this.$store.state.baseColors
      },
      set (array) {
        this.$store.commit('setBaseColors', array)
      }
    },
    single () { return this.colors.length === 1 },
    multi () { return this.colors.length !== 1 },
  },
  methods: {
    colorScale() {
      let colorList = [...this.colors]
      if(!this.colors && !this.colorNumber) return []
      if(this.single) colorList = ['white', ...this.colors]
      if(this.bezier && this.lightness) return chroma.bezier(colorList)
                                                .scale()
                                                .correctLightness()
                                                .colors(this.colorNumber)
      
      if(!this.bezier && !this.lightness) return chroma.scale(colorList).colors(this.colorNumber)
      if(this.bezier && !this.lightness) return chroma.bezier(colorList).scale().colors(this.colorNumber)
      if(!this.bezier && this.lightness) return chroma.scale(colorList).correctLightness().colors(this.colorNumber)
    }
  }
}
</script>

<style lang="scss">
  .flex {
    display: flex;
    //justify-content: flex-start;
    flex-direction: row;
  }
  .border { border: 1px solid gainsboro; }
  ul.options {
    display: flex;
    li {
      display: flex;
      margin: var(--space) 0;
    }
  }
  .card {
    &.toppie {
      justify-content: flex-start;
      align-items: space-between;
    }
  }

  .color-scale {
    align-self: flex-start;
    display: flex;
    flex-wrap: wrap;
    //margin: calc(-1 * var(--space));
    overflow: hidden;


    .color-swatch {
      flex: auto;
      min-width: 55px;
      border: 0.5px solid white;
      margin: 0;
      span { opacity: 0; }
      &:hover span { opacity: 1; }
    }
  }
  .flex .color-swatch {
    cursor: move !important;
  }

  .commit {
    padding: var(--space);
    margin-top: var(--space);
    display: flex;
    align-items: center;
    flex-direction: column;

    > * + * { margin-top: var(--space-s); }
  }
</style>
