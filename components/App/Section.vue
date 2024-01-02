<script setup lang="ts">
defineProps<{
  innerClass?: string
}>()
</script>

<template>
  <div class="relative pb-24">
    <div class="mx-auto md:max-w-5xl lg:max-w-7xl px-4 sm:px-6 lg:px-8" :class="innerClass">
      <slot />
    </div>
  </div>
</template>