import Vue from 'vue'

import 'vue-awesome/icons/tint'
import 'vue-awesome/icons/palette'
import 'vue-awesome/icons/paint-brush'
import 'vue-awesome/icons/image'
import 'vue-awesome/icons/arrow-up'
import 'vue-awesome/icons/arrow-right'
import 'vue-awesome/icons/arrow-down'
import 'vue-awesome/icons/arrow-left'
import 'vue-awesome/icons/check'
import 'vue-awesome/icons/minus'
import 'vue-awesome/icons/backward'
import 'vue-awesome/icons/plus'

import Icon from 'vue-awesome/components/Icon'
Vue.component('v-icon', Icon)

import puiButton from '@/components/pui/elements/puiButton'
Vue.component('puiButton', puiButton)

import NextPrev from '@/components/pui/elements/NextPrev'
Vue.component('NextPrev', NextPrev)