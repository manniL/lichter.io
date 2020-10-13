<template>
  <nav class="flex items-center justify-between flex-wrap bg-red-600 p-4 sticky top-0 z-10">
    <NuxtLink
        to="/"
        class="flex items-center flex-no-shrink text-white mr-6 no-underline"
    >
      <Icon
          view-box="0 0 1792 1792"
          path="M1120 576q0 13-9.5 22.5t-22.5 9.5-22.5-9.5-9.5-22.5q0-46-54-71t-106-25q-13 0-22.5-9.5t-9.5-22.5 9.5-22.5 22.5-9.5q50 0 99.5 16t87 54 37.5 90zm160 0q0-72-34.5-134t-90-101.5-123-62-136.5-22.5-136.5 22.5-123 62-90 101.5-34.5 134q0 101 68 180 10 11 30.5 33t30.5 33q128 153 141 298h228q13-145 141-298 10-11 30.5-33t30.5-33q68-79 68-180zm128 0q0 155-103 268-45 49-74.5 87t-59.5 95.5-34 107.5q47 28 47 82 0 37-25 64 25 27 25 64 0 52-45 81 13 23 13 47 0 46-31.5 71t-77.5 25q-20 44-60 70t-87 26-87-26-60-70q-46 0-77.5-25t-31.5-71q0-24 13-47-45-29-45-81 0-37 25-64-25-27-25-64 0-54 47-82-4-50-34-107.5t-59.5-95.5-74.5-87q-103-113-103-268 0-99 44.5-184.5t117-142 164-89 186.5-32.5 186.5 32.5 164 89 117 142 44.5 184.5z"
      />
      <span class="font-semibold text-xl tracking-tight">
        Lichter.io
      </span>
    </NuxtLink>
    <div
        class="block lg:hidden"
    >
      <button
          class="flex items-center px-3 border rounded text-red-300 border-red-400 w-10 hover:text-white hover:border-white"
          @click="toggleVisibility"
      >
        <Icon
            view-box="0 0 20 20"
            icon-title="Menu"
            path="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"
        />
      </button>
    </div>
    <div
        :class="{'hidden': !isVisible}"
        class="w-full lg:block flex-grow lg:flex lg:items-center lg:w-auto"
    >
      <div class="text-sm lg:flex-grow">
        <div
            v-for="item in navItems"
            :key="item.name"
            class="block mt-4 lg:inline-block lg:mt-0 mr-4"
        >
          <NuxtLink
              :to="item.link"
              class="text-red-200 hover:text-white no-underline"
              @click.native="toggleVisibility"
          >
            {{ item.name }}
          </NuxtLink>
        </div>
      </div>
      <div>
        <a
            class="block mt-4 lg:inline-block lg:mt-0 text-red-200 hover:text-white mr-4 no-underline cursor-pointer"
            href="https://blog.lichter.io?ref=lichter.io"
            rel="noopener"
            target="_blank"
        >
          Finally I have a blog too!
        </a>
      </div>
    </div>
  </nav>
</template>
<script>
import { ref } from '@nuxtjs/composition-api'
import Icon from '~/components/Icon.js'

export default {
  components: {
    Icon
  },
  setup () {
    const isVisible = ref(false)
    const toggleVisibility = () => {
      isVisible.value = !isVisible.value
    }

    return {
      isVisible,
      navItems: [
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
      ],
      toggleVisibility
    }
  }
}
</script>
