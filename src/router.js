import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'
import Home2 from './views/Home-2.vue'

// Image bundle
const Image = () => import(/* webpackChunkName: "second-load" */ './views/Image.vue')
const ChooseColor = () => import(/* webpackChunkName: "second-load" */ './views/ChooseColor.vue')
const ReadableColors = () => import(/* webpackChunkName: "second-load" */ './views/ReadableColors.vue')
const Palette = () => import(/* webpackChunkName: "second-load" */ './views/Palette.vue')

import ThankYou from './views/ThankYou.vue'

if (!window.VueRouter) Vue.use(VueRouter)

const router = new VueRouter({
  // mode: 'abstract',
  base: process.env.BASE_URL,
  routes: [
    /* {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        hideArrow: true
      }
    }, */
    {
      path: '/',
      name: 'One Multi',
      component: Home2,
      meta: {
        split: true,
        hideArrow: true
      }
    },
    {
      path: '/multi-color',
      name: 'One Multi',
      component: Home2,
      meta: {
        split: true,
        hideArrow: true
      }
    },
    {
      path: '/image',
      name: 'Image',
      component: Image
    },
    {
      path: '/choose-one-color',
      name: 'Start with one Color',
      component: ChooseColor,
      meta: {
        multi: false,
        icon: 'tint'
      }
    },
    {
      path: '/choose-multiple-colors',
      name: 'Create your own palette',
      component: ChooseColor,
      meta: {
        multi: true,
        icon: 'paint-brush'
      }
    },
    {
      path: '/readable-colors',
      name: 'Readable colors',
      component: ReadableColors,
    },
    {
      path: '/you-made-your-choice',
      name: 'Color palette',
      component: Palette,
    },
    {
      path: '/thank-you',
      name: 'Thank you',
      component: ThankYou,
    },
  ]
})

// router.replace('/')

export default router