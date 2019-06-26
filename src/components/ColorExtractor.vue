<template>
  <div>
    <img ref="image" :src="url" alt="" style="display: none;">
    <ul>
      <li v-for="(swatch, index) in coloursFromImage()" :key="index">
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
    //Vibrant.from().getPalette((err, palette) => this.swatches = palette)
  },
  methods: {
    async coloursFromImage() {
      const palette = await Vibrant.from(this.$refs.image).getPalette() // Use the library to extract colors
      const results = [palette.Vibrant, palette.LightVibrant, palette.DarkVibrant] // Create an array of the 3 most prominent colors
      return results.filter(swatch => swatch != null); // Remove null swatches from the array
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


