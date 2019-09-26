<template>
  <Transition
    enter-active-class="animated fade-in"
    leave-active-class="animated fade-out"
    mode="out-in"
    name="custom"
  >
    <div :key="currentUrlIndex" class="flex flex-col items-center">
      <img
        :src="currentImage.img"
        height="124"
        width="124"
      >
      <p class="text-lg text-gray-700">
        {{ currentImage.name }}
      </p>
    </div>
  </Transition>
</template>
<script>
export default {
  props: {
    interval: {
      type: Number,
      default: 5
    }
  },
  data () {
    return {
      currentUrlIndex: 0
    }
  },
  computed: {
    currentImage () {
      const { imgName, name } = this.$options.urls[this.currentUrlIndex]
      return { img: require(`~/assets/img/${imgName}.png`), name }
    }
  },
  mounted () {
    const intervalListener = setInterval(this.incrementUrlIndex, this.interval * 1000)
    this.$once('hook:beforeDestroy', () => {
      clearInterval(intervalListener)
    })
  },
  methods: {
    incrementUrlIndex () {
      this.currentUrlIndex = (this.currentUrlIndex + 1) % this.$options.urls.length
    }
  },
  urls: [
    { name: 'Vue.js', imgName: 'vuejs' },
    { name: 'Nuxt.js', imgName: 'nuxt' },
    { name: 'Laravel', imgName: 'laravel' },
    { name: 'Tailwind', imgName: 'tailwind' },
    { name: 'Git', imgName: 'git' },
    { name: 'Travis CI', imgName: 'travisci' },
    { name: 'Node.js', imgName: 'node' },
    { name: 'Webpack', imgName: 'webpack' }
  ]
}
</script>

<style scoped>
  @keyframes fade-out {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  }

  .fade-out {
    animation-name: fade-out;
  }
</style>
