<template>
  <div>
    <img ref="image" :src="url" alt="" style="display: none;">
    <ul>
      <li v-for="swatch in swatches">
        <div class="$style.colorBox" :style="{ backgroundColor: swatch.hex }">
          <p>{{ swatch }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import * as Vibrant from 'node-vibrant'

export default {
  name: "ColorExtractor",
  props: {
    url: String
  },
  data: () => ({
    swatches: []
  }),
  mounted() {
    Vibrant.from(this.$refs.image).getPalette((err, palette) => this.swatches = palette)
  },
  methods: {
    getPalette() {
      console.log(this.$refs)
    }
  },
  components: {
  }
};
</script>

<style module>
  img { max-width: 100%; }
  .colorBox {
    width: 200px;
    height: 200px;
  }
</style>


