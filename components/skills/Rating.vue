<template>
  <div class="flex">
    <rating-square
      v-for="i in (1,5)"
      :key="i"
      :hidden="i > rating"/>
  </div>
</template>
<script>
import RatingSquare from '~/components/skills/RatingSquare.vue'

export default {
  components: { RatingSquare },
  props: {
    rating: {
      type: Number,
      required: true,
      validator: (value) => value >= 0 && value <= 5
    }
  }
}
</script>
