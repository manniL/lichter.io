<script>
import { h } from '@nuxtjs/composition-api'

export default {
  props: {
    hidden: {
      type: Boolean,
      required: true
    }
  },
  setup (props) {
    const outerClasses = 'w-8 h-8 border-4 border-red-900 shadow-lg mx-1 bg-transparent transition duration-300 ease-in-out transform group-hover:rotate-45 motion-reduce:transition-none motion-reduce:transform-none'
    const innerClasses = ['absolute w-4 h-4 m-1 bg-red-800 shadow-lg', { hidden: props.hidden }]

    const innerDiv = h('div', { class: innerClasses }, '')

    return () => h('div', { class: outerClasses }, [innerDiv])
  }
}
</script>
