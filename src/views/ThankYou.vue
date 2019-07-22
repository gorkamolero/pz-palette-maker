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
    if( (window.vuebridge && window.vuebridge[this.getGlobalMethod]) ) {
      window.vuebridge[this.getGlobalMethod](this.getFinalScale)
    } else {
      const msg =  `There is no global method called '${this.getGlobalMethod}'.
Please contact your organization's Isidro ¯\_(ツ)_/¯
Colors: ${this.getFinalScale}`
      console.warn(msg)
    }
  },
  computed: {
    ...mapGetters(['getFinalScale', 'getGlobalMethod'])
  }
}
</script>