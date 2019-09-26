<template>
  <div class="flex flex-col w-5/6 md:w-1/3 items-center lg:items-stretch">
    <div
      :class="{'lg:flex-row': !isRight, 'lg:flex-row-reverse': isRight}"
      class="flex flex-col-reverse items-center justify-start my-6"
    >
      <Rating :rating="rating" />
      <h2
        :class="{'lg:ml-3': !isRight, 'lg:mr-3': isRight}"
        class="text-xl font-semibold text-center mb-2 lg:mb-0"
        v-text="title"
      />
    </div>
    <!-- eslint-disable vue/no-v-html -->
    <p
      :class="{'lg:mr-auto ml-1': !isRight, 'lg:ml-auto mr-1': isRight}"
      class="text-small text-center lg:text-left"
      v-html="itemString"
    />
    <!-- eslint-enable vue/no-v-html -->
  </div>
</template>

<script>
import Rating from '~/components/skills/Rating.vue'

export default {
  components: {
    Rating
  },
  props: {
    title: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    isRight: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    itemString () {
      return this.items.map(i => i.strong ? `<strong>${i.text}</strong>` : i.text).join(', ')
    }
  }
}
</script>
