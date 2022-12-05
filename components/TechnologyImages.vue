<template>
  <Transition enter-active-class="fade-in" leave-active-class="fade-out" mode="out-in" appear>
    <div :key="currentUrlIndex" class="flex flex-col items-center">
      <img :src="currentImage.img" height="124" width="124">
      <p class="text-lg text-gray-700">
        {{ currentImage.name }}
      </p>
    </div>
  </Transition>
</template>
<script setup lang="ts">
const IMAGE_URLS = [
  { name: 'Vue.js', imgName: 'vuejs' },
  { name: 'Nuxt.js', imgName: 'nuxt' },
  { name: 'Laravel', imgName: 'laravel' },
  { name: 'Tailwind', imgName: 'tailwind' },
  { name: 'Git', imgName: 'git' },
  { name: 'Travis CI', imgName: 'travisci' },
  { name: 'Node.js', imgName: 'node' },
  { name: 'Webpack', imgName: 'webpack' }
]

const props = withDefaults(defineProps<{
  interval?: number
}>(), { interval: 5 })

// https://github.com/nuxt/framework/issues/7121
const assets = import.meta.glob('~/assets/img/*.png', {
  eager: true,
  import: 'default',
})
const currentUrlIndex = ref(0)
const currentImage = computed(() => {
  const { imgName, name } = IMAGE_URLS[currentUrlIndex.value]
  // @ts-expect-error wrong typing here
  const img = assets[`/assets/img/${imgName}.png`] as string
  return { img, name }
})

const incrementUrlIndex = () => {
  currentUrlIndex.value = (currentUrlIndex.value + 1) % IMAGE_URLS.length
}
useIntervalFn(incrementUrlIndex, props.interval * 1000)
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
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-name: fade-out;
}
</style>
