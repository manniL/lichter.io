<template>
  <nav class="flex items-center justify-between flex-wrap bg-red-600 p-4 sticky top-0 z-10">
    <NuxtLink to="/" class="flex items-center flex-no-shrink text-white mr-6 no-underline">
      <Icon class="w-6 h-6 mr-2" name="heroicons:light-bulb-solid" />
      <span class="font-semibold text-xl tracking-tight">
        Lichter.io
      </span>
    </NuxtLink>
    <div class="block lg:hidden">
      <button
        class="flex items-center px-3 border rounded text-red-300 border-red-400 w-10 hover:text-white hover:border-white"
        @click="toggleVisibility">
        <Icon class="w-6 h-8" name="heroicons:bars-3-20-solid"/>
      </button>
    </div>
    <div :class="{ 'hidden': !isVisible }" class="w-full lg:block flex-grow lg:flex lg:items-center lg:w-auto">
      <div class="text-sm lg:flex-grow">
        <div v-for="item in NAV_ITEMS" :key="item.name" class="block mt-4 lg:inline-block lg:mt-0 mr-4">
          <NuxtLink :to="item.link" class="text-red-200 hover:text-white no-underline" @click.native="toggleVisibility">
            {{ item.name }}
          </NuxtLink>
        </div>
      </div>
      <div>
        <NuxtLink class="block mt-4 lg:inline-block lg:mt-0 text-red-200 hover:text-white mr-4 no-underline cursor-pointer"
          to="https://blog.lichter.io?ref=lichter.io">
          Finally I have a blog too!
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>
<script setup lang="ts">
const isVisible = ref(false)
const toggleVisibility = () => {
  isVisible.value = !isVisible.value
}

const NAV_ITEMS = [
  {
    name: 'Timeline',
    link: '/timeline/'
  },
  {
    name: 'Speaking',
    link: '/speaking/'
  },
  {
    name: 'Support me',
    link: '/support-me/'
  }
]
</script>
