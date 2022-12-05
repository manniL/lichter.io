<template>
  <nav class="flex items-center justify-between flex-wrap bg-indigo-600 p-2 bottom-0 z-10">
    <div class="flex-grow flex items-center w-auto">
      <div class="text-sm flex-grow">
        <NuxtLink
          to="/legal/"
          no-prefetch
          rel="nofollow"
          class="inline-block mt-0 mr-2 text-white hover:text-indigo-100 no-underline"
          v-text="'Legal notice'"
        />
        <NuxtLink
          to="/privacy/"
          no-prefetch
          rel="nofollow"
          class="inline-block mt-0 text-white hover:text-indigo-100 no-underline"
          v-text="'Privacy Policy'"
        />
      </div>
      <div class="flex items-center flex-no-shrink text-white">
        <NuxtLink
          class="font-hairline text-sm mr-2 flex items-center text-gray-100 no-underline hover:text-white"
          to="https://github.com/manniL/lichter.io"
        >
          <span class="mr-1">
            v{{ version }}
          </span>
          <Icon
            class="block w-4 h-4 fill-current"
            name="carbon:logo-github"
          />
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>
<script setup lang="ts">
import { version } from '~/package.json'
</script>
