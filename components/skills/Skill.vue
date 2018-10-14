<template>
  <div class="flex flex-col w-5/6 md:w-1/3 items-center lg:items-stretch">
    <div
      :class="{'lg:flex-row': !right, 'lg:flex-row-reverse': right}"
      class="flex flex-col-reverse items-center justify-start my-6">
      <rating :rating="rating"/>
      <h2
        :class="{'lg:ml-3': !right, 'lg:mr-3': right}"
        class="text-center mb-2 lg:mb-0"
        v-text="title"/>
    </div>
    <p
      :class="{'lg:mr-auto ml-1': !right, 'lg:ml-auto mr-1': right}"
      class="text-small text-center lg:text-left"
      v-html="itemString"/>
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
    right: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    itemString() {
      return this.items.map(i => i.strong ? `<strong>${i.text}</strong>` : i.text).join(', ')
    }
  }
}
</script>
