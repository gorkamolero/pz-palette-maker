<template>
  <article class="step puiSpaceOut">
    <div class="card">
      <pui-icon :icon="$route.meta.icon" :scale="4" :style="{'fill': localColor}"/>
      <span :style="{ color: localColor }">{{ $route.name }}</span>
    </div>

    <div class="card">
      <div class="card-inner color-swatch-wrap">
        <div style="text-align: center; width: 100%; padding: 1em;" v-if="baseColors.length >= 5">You've reached the maximum: 5 selectable colors</div>
        <template v-for="(color, index) in baseColors">
          
          <div v-if="baseColors.length" class="color-swatch" :class="{ 'single': !$route.meta.multi && baseColors.length !== 0 }" :key="index">
            <div class="remover">
              <pui-button @click.native="removeBaseColor(index)" fab size="small">
                <pui-icon color="white" icon="minus" />
              </pui-button>
            </div>
            
            
            <div class="color" @click="open(color, index)" :style="[{backgroundColor: color}]" :class="{border: color.includes('f') || color.includes('white')}"></div>
            <span>{{ color }}</span>
          </div>
        </template>
      </div>

      <div class="flex">

        <pui-button v-if="$route.meta.multi && baseColors.length > 1" @click.native="reset()" fab size="small">
          <pui-icon color="white" icon="undo" />
        </pui-button>
        
        <pui-button v-if="($route.meta.multi || baseColors.length === 0) && baseColors.length <= 4" @click.native="addNewColor" fab size="small">
          <pui-icon color="white" icon="plus" />
        </pui-button>

      </div>

      <cute-modal name="colorpick" class="colorpick" :on-close="close">
        <div class="flex-column">
          <Chrome :value="localColor" @input="setLocalColorFromPicker" />
          <div class="OK">
            <pui-button @click.native="setNClose" fab size="small">
              <pui-icon color="white" icon="check" />
            </pui-button>
          </div>
        </div>
      </cute-modal>

      <pui-next-prev
        v-if="baseColors.length"
        icon="arrow-right"
        to="/readable-colors"
        bottom right>
      </pui-next-prev>
    </div>
  </article>
</template>

<script>
import Vue from 'vue'
import router from '@/router'
import { mapMutations, mapGetters, mapActions } from 'vuex'
import CuteModal from 'vue-cute-modal'
const Swatches = () => import(/* webpackChunkName: "color" */ 'vue-swatches')


Vue.use(CuteModal, {
  onOpen: () => window.cute = true
})

export default {
  components: {
    Chrome: () => import( /* webpackChunkName: "color" */ 'vue-color').then(({ Chrome }) => Chrome),
    Swatches,
  },
  mounted() {
    if(this.baseColors.length) return
    this.$nextTick(function() { this.open('#808080', this.localIndex) })
  },
  data: () => ({
    localColor: '',
    localIndex: 0
  }),
  methods: {
    ...mapMutations([
      'addBaseColor',
      'setColorByIndex',
      'setSingleBaseColor',
      'removeBaseColor',
      'resetAllColors'
    ]),
    reset () {
      this.resetAllColors()
      router.push('/')
    },
    addNewColor() {
      this.addBaseColor('#808080')
      this.$nextTick(() => this.open('#EEE', this.localIndex))
      this.localIndex ++
    },
    setLocalColor(color) {
      this.localColor = color
      document.documentElement.style.setProperty('--local-color', this.localColor)
    },
    setLocalIndex(index) { this.localIndex = index },
    setLocalColorFromPicker({hex}) { this.setLocalColor(hex) },
    onSetColor() {
      this.setColorByIndex({
        color: this.localColor,
        index: this.localIndex
      })
    },
    setNClose() {
      if(!this.$route.meta.multi) this.setSingleBaseColor(this.localColor)
      this.close()
    },
    open(color, index) {
      this.$cuteModal.open('colorpick')
      this.$nextTick(() => {
        this.setLocalColor(color)
        this.setLocalIndex(index)
      })
    },
    close(){
      this.onSetColor()
      this.$cuteModal.hide('colorpick')
    },
  },
  computed: {
    ...mapGetters({
      baseColors: 'getBaseColors',
      mode: 'getMode'
    }),
  },
}
</script>

<style lang="scss">
:root {
  --local-color: #808080;
}
.pz {
  // Modal CSS
  @import '~vue-cute-modal/dist/vue-cute-modal.min.css';
}

.pz-palette-maker {
  .choose {
    display: flex;
  }

  .color-swatch {
    width: 60px;
    margin: var(--space-s);
    margin-top: auto;
    display: flex;
    flex-direction: column;
    position: relative;

    > span {
      font-size: 10px;
      padding: var(--space-s);
    }

    .color {
      height: 0;
      padding-bottom: calc(100% * 3 / 3);
    }

    cursor: pointer;
    transition: all var(--trans);
    &:hover { transform: scale(1.05) }

    &.single {
      transform: scale(1.5);
      &:hover { transform: scale(1.6) }
      &:not(:last-of-type) { display: none; }
    }

    &-wrap {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-wrap: wrap;
    }
    .remover {
      position: absolute;
      top: 0; right: 0;
      transform: scale(.5) translate(40%, -40%);
      transform-origin: right top;
      
      opacity: 0;
      transition: all var(--trans);

      &:hover { transform: scale(.55) translate(40%, -40%); }
    }
    &:hover .remover {
      opacity: 1;
    }
  }

  .OK {
    padding: 10px;
    position: absolute;
    bottom: 0;
    transform: translateY(100%);
  }

  .flex {
    display: flex;
    * + * { margin-left: .5rem; }
  }

  .flex-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  .resetter {
    position: absolute;
    top: 0; right: 0;
    margin: var(--space-s);
  }

  .colorpick {
    .con-title-after,
    .vs-dialog-cancel,
    .vs-dialog footer {
      display: none;
    }
    .vs-popup,
    .vs-dialog,
    .cute-modal__container {
      width: auto !important;
      background: transparent !important;
    }
    .vs-popup--title { display: none; }
    .vs-popup--content,
    .vs-dialog-text,
    .cute-modal__body {
      padding: 0 !important;
    }
    .modal-base {
      position: fixed;
    }
    .cute-modal__overlay {
      opacity: 1;
      pointer-events: none;
      background-color: var(--local-color);
    }
    .cute-modal__container {
      transition: opacity var(--trans) !important;
    }
  }
}
</style>
