<script>
import {
  getPopupElementSize,
  getRelativePosition,
} from '~/utils/dom'

export default {
  name: 'Popup',
  props: {
    appendToBody: {
      type: Boolean,
      default: true,
    },
    fixedPosition: {
      type: String,
      default: '',
    },
    inline: {
      type: Boolean,
      default: false,
    },
    rtl: {
      type: Boolean,
      default: false,
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      popupRect: null,
      relativeElement: null,
    }
  },
  watch: {
    visible: {
      immediate: true,
      handler(val) {
        this.$nextTick(() => {
          if (val) {
            this.displayPopup()
          }
        })
      },
    },
  },
  mounted() {
    if (this.inline) {
      return
    }
    this.relativeElement = this.$parent.$el
    if (this.appendToBody) {
      document.body.appendChild(this.$el)
      const relativeRect = this.$parent.$el.getBoundingClientRect()
      this.$el.style.top = `${relativeRect.top}px`
    }
  },
  beforeDestroy() {
    if (this.inline) {
      return
    }
    if (this.appendToBody && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  },
  methods: {
    displayPopup() {
      if (this.inline || !this.visible) return
      const popup = this.$el
      const relativeElement = this.$parent.$el
      if (!this.popupRect) {
        this.popupRect = getPopupElementSize(popup)
      }
      const { width, height } = this.popupRect
      const { left, top } = getRelativePosition({
        el: popup,
        elRelative: relativeElement,
        targetWidth: width,
        targetHeight: height,
        fixed: this.appendToBody,
        fixedPosition: this.fixedPosition,
        rtl: this.rtl,
      })

      this.$el.style.left = left
      this.$el.style.top = top
    },
  },
  render() {
    return this.$slots.default
  },
}
</script>
