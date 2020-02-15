<script>
import { createElement as h } from '@vue/composition-api'

export default {
  props: {
    hidden: {
      type: Boolean,
      required: true
    }
  },
  setup (props) {
    const outerClasses = 'w-8 h-8 border-4 border-red-900 shadow-lg mx-1 bg-transparent group-hover:rotate-45 transition-all-300'
    const innerClasses = ['absolute w-4 h-4 m-1 bg-red-800 shadow-lg', { hidden: props.hidden }]

    const innerDiv = h('div', { class: innerClasses }, '')

    return () => h('div', { class: outerClasses }, [innerDiv])
  }
}
</script>
