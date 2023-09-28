<script setup lang="ts">
defineProps<{
  workshop: any
}>()
</script>

<template>
  <AppLink :to="workshop._path"
    class="group flex flex-col justify-between hover:bg-gradient-to-r hover:-translate-y-2 transition-all duration-500 from-red-500/60 to-pink-600/60 px-4 py-8 bg-zinc-900">
    <AppParagraph tag="h3" class="text-2xl font-semibold">{{ workshop.title }}</AppParagraph>
    <AppParagraph look="paragraph" class="mt-8 group-hover:text-gray-200">{{ workshop.description }}</AppParagraph>
    <WorkshopDetails class="mt-8 space-y-2" :time="workshop.time" no-trainer />
  </AppLink>
</template>