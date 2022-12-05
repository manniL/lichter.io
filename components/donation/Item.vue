<script setup lang="ts">
import { filename } from 'pathe/utils';
import type { DonationLinkInfo } from '~/types';

const props = defineProps<{
  info: DonationLinkInfo
}>()

const textPrice = computed(() => {
  if (props.info.amountInCent === null) {
    return '???? €'
  }

  return `${(props.info.amountInCent / 100).toFixed(2)} €`
})

// https://github.com/nuxt/framework/issues/7121
const assets = import.meta.glob('~/assets/img/donations/*.png', {
  eager: true,
  import: 'default',
})
const images = Object.fromEntries(
  Object.entries(assets).map(([key, value]) => [filename(key), value])
);

const imageSources = computed(() => ({
  // @ts-expect-error - TS doesn't know the right type here
  src: images[props.info.slug] as string,
  // @ts-expect-error - TS doesn't know the right type here
  srcSet: `${images[props.info.slug] as string} 2x`,
}))

</script>

<template>
  <NuxtLink :to="info.url" external
    class="flex flex-col md:flex-row items-center my-8 border border-gray-300 hover:border-gray-500 shadow-lg p-4 w-full hover:shadow-2xl transition-all duration-200 ease-linear"
    :name="info.name">
    <span class="flex flex-no-shrink flex-col md:mr-8 mb-4 md:mb-0">
      <img :src="imageSources.src" :alt="info.name" class="rounded-full border border-gray-500">
    </span>
    <span class="text-center md:text-left">
      <span class="block text-2xl font-bold py-3">
        {{ textPrice }} — {{ info.name }}
      </span>
      <span v-text="info.description" />
    </span>
  </NuxtLink>
</template>