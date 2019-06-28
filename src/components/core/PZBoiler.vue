<template>
  <div class="pz loader">
    <Styles />
    <slot />
  </div>
</template>

<script>
import 'material-icons/iconfont/material-icons.css'
import '@bit/pickzen.pui.core.font-loader/FontLoader.js'
import '@bit/pickzen.pui.core.vuesax-loader/VuesaxLoader.js'
import Styles from '@bit/pickzen.pui.core.styles/Styles'

import '@/components/pui/pui-loader'
import '@/utils/filters'
import '@/plugins/observeVisibility'

export default {
  components: {
    Styles,
  },
}
</script>

<style lang="scss">
.pz { font-family: 'Europa', sans-serif; }
</style>
