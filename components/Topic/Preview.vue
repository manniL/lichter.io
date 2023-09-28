<script setup lang="ts">
defineProps<{
  topic: {
    _path: string,
    title: string
  }
}>()
</script>

<template>
  <AppLink :to="topic._path"
    class="inline group border-l-4 border-red-500 relative flex flex-col justify-between hover:bg-gradient-to-r hover:-translate-y-2 hover:border-zinc-300 transition-all duration-500 from-red-500/60 to-pink-600/60 p-8 bg-zinc-800">
    <AppParagraph tag="h3" class="text-2xl font-semibold">{{ topic.title }}</AppParagraph>
  </AppLink>
</template>