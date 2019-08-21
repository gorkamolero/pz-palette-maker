<template>
  <FontAwesomeIcon
    :color="color"
    :icon="icon"
    :style="{transform: `scale(${scale})`, marginBottom: `${scale === 1 ? 0 : scale/2}em`}"
  />
</template>

<script>
// Vendor / external
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTint, faPalette, faImage, faPaintBrush, faArrowUp, faArrowRight, faArrowDown, faArrowLeft, faCheck, faMinus, faBackward, faPlus } from '@fortawesome/free-solid-svg-icons'

// Registering them
library.add(faTint, faPalette, faImage, faPaintBrush, faArrowUp, faArrowRight, faArrowDown, faArrowLeft, faCheck, faMinus, faBackward, faPlus)

export default {
  name: 'PuiIcon',
  components: {
    FontAwesomeIcon
  },
  props: {
    icon: {
      type: String,
      default: 'arrow-right'
    },
    color: {
      type: String,
      default: 'grey'
    },
    scale: {
      type: Number,
      default: 1
    }
  }
}
</script>