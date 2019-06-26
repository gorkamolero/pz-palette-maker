<template>
  <div>
    <h1>Thank you!</h1>
    <img src="../assets/circular-sunglasses.png" alt="">
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  mounted () {
    window[this.getGlobalMethod](this.getFinalScale)
  },
  computed: {
    ...mapGetters(['getFinalScale', 'getGlobalMethod'])
  }
}
</script>

<style>

</style>
