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

import { computed, ref } from '@vue/composition-api'
import { useInterval } from '@/compositions/useInterval'

const imageUrls = [
  { name: 'Vue.js', imgName: 'vuejs' },
  { name: 'Nuxt.js', imgName: 'nuxt' },
  { name: 'Laravel', imgName: 'laravel' },
  { name: 'Tailwind', imgName: 'tailwind' },
  { name: 'Git', imgName: 'git' },
  { name: 'Travis CI', imgName: 'travisci' },
  { name: 'Node.js', imgName: 'node' },
  { name: 'Webpack', imgName: 'webpack' }
]

export default {
  props: {
    interval: {
      type: Number,
      default: 5
    }
  },
  setup (props) {
    const currentUrlIndex = ref(0)
    const currentImage = computed(() => {
      const { imgName, name } = imageUrls[currentUrlIndex.value]
      return { img: require(`~/assets/img/${imgName}.png`), name }
    })

    const incrementUrlIndex = () => { currentUrlIndex.value = (currentUrlIndex.value + 1) % imageUrls.length }

    useInterval(props.interval, incrementUrlIndex)

    return {
      imageUrls,
      currentImage,
      currentUrlIndex
    }
  }
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
