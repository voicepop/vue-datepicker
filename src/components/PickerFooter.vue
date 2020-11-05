<template>
  <footer v-show="config.showFooter">
    <span
      :class="{'disabled': isLeftNavDisabled}"
      class="prev"
      @click="config.isRtl ? next() : previous()"
    >
      <slot name="prevIntervalBtn">
        <span class="default">&lt;</span>
      </slot>
    </span>
    <slot name="footerContent" />
    <span
      :class="{'disabled': isRightNavDisabled}"
      class="next"
      @click="config.isRtl ? previous() : next()"
    >
      <slot name="nextIntervalBtn">
        <span class="default">&gt;</span>
      </slot>
    </span>
  </footer>
</template>

<script>
export default {
  name: 'DatepickerFooter',
  props: {
    config: {
      type: Object,
      default() {
        return {
          showFooter: true,
          isRtl: false,
          isNextDisabled() {
            return false
          },
          isPreviousDisabled() {
            return false
          },
        }
      },
    },
    next: {
      type: Function,
      default() {
        return false
      },
    },
    previous: {
      type: Function,
      default() {
        return false
      },
    },
  },
  computed: {
    /**
     * Is the left hand navigation button disabled?
     * @return {Boolean}
     */
    isLeftNavDisabled() {
      return this.config.isRtl
        ? this.config.isNextDisabled()
        : this.config.isPreviousDisabled()
    },
    /**
     * Is the right hand navigation button disabled?
     * @return {Boolean}
     */
    isRightNavDisabled() {
      return this.config.isRtl
        ? this.config.isPreviousDisabled()
        : this.config.isNextDisabled()
    },
  },
}
</script>
