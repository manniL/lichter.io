<template>
  <button
    class="flex flex-col md:flex-row items-center my-8 border border-gray-300 hover:border-gray-500 shadow-lg p-4 w-full hover:shadow-2xl transition-all-300"
    :name="name"
  >
    <span class="flex flex-no-shrink flex-col md:mr-8 mb-4 md:mb-0">
      <img v-bind="imageSources" :alt="name" class="rounded-full border border-gray-500">
    </span>
    <span class="text-center md:text-left">
      <span class="block text-2xl font-bold py-3">
        {{ textPrice }} — {{ name }}
      </span>
      <span v-text="description" />
    </span>
  </button>
</template>

<script>

export default {
  props: {
    name: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      default: 'kolle'
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  },
  computed: {
    textPrice () {
      if (this.price === -1) {
        return '???? €'
      }

      const euro = this.price / 100
      return `${euro.toFixed(2).toLocaleString()} €`
    },
    imageSources () {
      return {
        src: require(`~/assets/img/donations/${this.slug}.png`),
        srcset: `${require(`~/assets/img/donations/${this.slug}@2x.png`)} 2x`
      }
    }
  }
}
</script>
