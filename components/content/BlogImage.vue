<script setup lang="ts">
defineProps<{
  src: string
  width: number | string
  height: number | string
  alt: string
  caption?: string
  hideCaption?: true
  nonLazy?: true
}>()
</script>

<template>
  <figure class="flex flex-col items-center">
    <NuxtPicture :loading="nonLazy ? undefined : 'lazy'" class="not-prose" format="avif,webp,jpg" densities="1x 2x" :src="src" :alt="alt" :width="width" :height="height" />
    <figcaption v-if="!hideCaption" class="text-center text-zinc-400 text-xs sm:text-sm">{{ caption ?? alt }}</figcaption>
  </figure>
</template>