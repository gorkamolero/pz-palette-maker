<template>
  <article class="step puiSpaceOut">
    <NextPrev
      v-if="$route.meta.multi"
      @click="resetAllColors()"
      icon="autorenew"
      top right
    >

      <small>Reset...</small>
    </NextPrev>    
    
    <div class="card">
      <vs-icon size="80px" icon="invert_colors" :color="localColor" />
      <span :style="{ color: localColor }">{{ $route.name }}</span>
    </div>

    <div class="card">
      <div class="card-inner color-swatch-wrap">
        <template v-for="(color, index) in baseColors">
          <div v-if="baseColors.length" class="color-swatch" :class="{ 'single': !$route.meta.multi }" :key="index">
            <vs-button @click="removeBaseColor(index)" size="small" class="remover" radius color="warning" type="filled" icon="remove" />
            
            <div class="color" @click="open(color, index)" :style="[{backgroundColor: color}]" :class="{border: color.includes('f') || color.includes('white')}"></div>
            <span>{{ color }}</span>
          </div>
        </template>
      </div>

      <vs-button radius v-if="$route.meta.multi" @click="addNewColor" color="#f8981d" gradient-color-secondary="#ffb85d" type="gradient" icon="add" size="small" />

      <cute-modal name="colorpick" class="colorpick" :on-close="close">
        <div class="flex-column">
          <Chrome :value="localColor" @input="setLocalColorFromPicker" />
          <div class="OK">
            <vs-button @click="setNClose" radius color="#f8981d" gradient-color-secondary="#ffb85d" type="gradient" icon="done_outline" />
          </div>
        </div>
      </cute-modal>

      <NextPrev
        v-if="baseColors.length"
        icon="arrow_forward"
        to="/readable-colors"
        bottom right>
        <small v-if="$route.meta.multi">I know what I'm doing</small>
        <small v-else>This is it</small>
      </NextPrev>
    </div>
  </article>
</template>

<script>
        // @input="onSetColor"
import { mapMutations, mapGetters, mapActions } from 'vuex'
import Swatches from 'vue-swatches'
import { Chrome } from 'vue-color'
import NextPrev from '@/components/elements/NextPrev'

export default {
  components: {
    Chrome,
    Swatches,
    NextPrev
  },
  mounted() {
    if(this.baseColors.length) return
    this.open('#808080', this.localIndex)
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
    addNewColor() {
      this.addBaseColor('#808080')
      this.$nextTick(() => this.open('#EEE', this.localIndex))
      this.localIndex ++
    },
    setLocalColor(color) {
      document.documentElement.style.setProperty('--local-color', this.localColor)
      this.localColor = color
    },
    setLocalIndex(index) { this.localIndex = index },
    setLocalColorFromPicker({hex}) { this.setLocalColor(hex) },
    onSetColor() {
      this.setColorByIndex({
        color: this.localColor,
        index: this.localIndex
      })
      // this.close()
      
      // this.setMode('color')
      // this.setBaseColor(hex)
      // //
      // this.mode === 'color' && router.push('/color')
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
      transform: scale(.75) translate(40%, -40%);
      transform-origin: right top;
      
      opacity: 0;
      transition: all var(--trans);

      &:hover { transform: scale(.8) translate(40%, -40%); }
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
</style>
