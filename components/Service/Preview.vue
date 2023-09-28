<script setup lang="ts">
defineProps<{
  icon: string,
  title: string,
  to: string,
}>()
</script>

<template>
  <AppLink :to="to" class="flex-1 flex flex-col items-center group">
    <div class="bg-clip-text bg-gradient-to-r from-red-600 to-pink-700">
      <Icon :name="icon" class="transition-all group-hover:scale-125 text-6xl icon-gradient" />
    </div>
    <AppParagraph tag="h2" class="mt-4 text-2xl font-semibold">
      {{ title }}
    </AppParagraph>
    <AppParagraph look="paragraph" class="mt-4 max-w-4xl text-center">
      <slot />
    </AppParagraph>
  </AppLink>
</template>

<style scoped>
.icon-gradient :deep(path) {
  fill: url(#gradient-svg-icon)
}
</style>