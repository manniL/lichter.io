<script setup lang="ts">
defineProps<{
  person: string,
  job: string,
  imageLink: string,
}>()
</script>

<template>
  <div class="bg-zinc-900 p-8 text-zinc-200 flex flex-col justify-between">
    <div>
      <slot />
    </div>
    <div class="mt-8 pt-8 flex gap-x-2 items-center border-t border-t-zinc-400">
      <NuxtPicture format="avif,webp,jpg" densities="1x 2x" width="64" height="64" :img-attrs="{ class: 'mr-4 rounded-full mt-2'}" :src="imageLink" :alt="`Headshot of ${person}`" />
      <div>
        <p class="font-bold">{{ person }}</p>
        <p>{{ job }}</p>
      </div>
    </div>
  </div>
</template>