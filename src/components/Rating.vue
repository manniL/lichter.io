<template>
    <div class="flex">
        <rating-square v-for="i in (1,5)" :key="i" :hidden="i > rating"></rating-square>
    </div>
</template>
<script>
  import RatingSquare from './RatingSquare.vue'

  export default {
    components: {RatingSquare},
    props: {
      rating: {
        type: Number,
        required: true,
        validator: (value) => {
          return value >= 0 && value <= 5
        }
      }
    },
    data () {
      return {}
    }
  }
</script>