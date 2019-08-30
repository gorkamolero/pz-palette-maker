<template>
  <article class="final step">
    <div class="card leftie">
      <div class="card-inner">
        <h1>Ready! <span v-if="multi">You can now rearrange to your liking! </span></h1>
        

        <br><br>
        
        <SlickList class="flex" axis="x" v-model="colors" appendTo=".final.step">
          <SlickItem v-for="(color, index) in colors" :index="index" :key="index">
            <div class="color-swatch">
              <div class="color" :style="{backgroundColor: color}"></div>
            </div>
          </SlickItem>
        </SlickList>

        <ul class="options" v-if="multi">
          <li>
            <input type="checkbox" id="bezier" v-model="bezier">
            <label for="bezier">Smooth transition</label>
          </li>
          <li>
            <input type="checkbox" id="lightness" v-model="lightness">
            <label for="lightness">Correct Lighting</label>
          </li>
        </ul>

        <footer style="margin-top: auto;">
          <small>Your color palette is automatically calculated from the number of slides in your quiz.</small>
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
        <p>If you're happy with this palette, proceed:</p>
      </div>
    </div>

    <pui-next-prev
      icon="arrow-right"
      to="/thank-you"
      bottom right>
    </pui-next-prev>
  </article>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { SlickList, SlickItem } from 'vue-slicksort'
import chroma from 'chroma-js'
//const chroma = () => import(/* webpackChunkName: "color" */ 'chroma-js')

export default {
  data: () => ({
    bezier: true,
    lightness: false,
  }),
  components: {
    SlickItem,
    SlickList,
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
    slides () { return this.$store.state.slides }
  },
  beforeDestroy() {
    this.setFinalScale(this.colorScale())
  },
  methods: {
    ...mapMutations(['setFinalScale', 'setNumOfSlides']),
    colorScale() {
      let colorList = [...this.colors]
      if(!this.colors && !this.slides) return []
      if(this.single) colorList = ['white', ...this.colors]
      if(this.bezier && this.lightness) return chroma.bezier(colorList)
                                                .scale()
                                                .correctLightness()
                                                .colors(this.slides)
      
      if(!this.bezier && !this.lightness) return chroma.scale(colorList).colors(this.slides)
      if(this.bezier && !this.lightness) return chroma.bezier(colorList).scale().colors(this.slides)
      if(!this.bezier && this.lightness) return chroma.scale(colorList).correctLightness().colors(this.slides)
    }
  }
}
</script>

<style lang="scss">
.pz-palette-maker {
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
    /* justify-content: center; */
    display: flex;
    flex-wrap: wrap;
    //margin: calc(-1 * var(--space));
    overflow: hidden;


    .color-swatch {
      min-width: 55px;
      border: 0.5px solid white;
      margin: 0;
      span { opacity: 0; }
      pointer-events: none;
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
}
</style>
