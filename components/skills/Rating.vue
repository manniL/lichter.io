<script>
import RatingSquare from '~/components/skills/RatingSquare.vue'

export default {
  functional: true,
  components: { RatingSquare },
  props: {
    rating: {
      type: Number,
      required: true,
      validator: value => value >= 0 && value <= 5
    }
  },
  render (h, { props }) {
    const squares = Array
      .from({ length: 5 }, (_, i) => i + 1)
      .map(i => h(RatingSquare, { props: { hidden: i > props.rating } }))

    return h('div', {
      class: 'flex group'
    }, squares)
  }
}
</script>
