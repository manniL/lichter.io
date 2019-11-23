<script>
import { createElement as h } from '@vue/composition-api'
import RatingSquare from '~/components/skills/RatingSquare.vue'

export default {
  components: { RatingSquare },
  props: {
    rating: {
      type: Number,
      required: true,
      validator: value => value >= 0 && value <= 5
    }
  },
  setup (props) {
    const squares = Array
      .from({ length: 5 }, (_, i) => i + 1)
      .map(i => h(RatingSquare, { props: { hidden: i > props.rating } }))

    return () => h('div', { class: 'flex group' }, squares)
  }
}
</script>
