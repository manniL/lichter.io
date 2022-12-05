<script setup lang="ts">
defineProps<{
  hidden: boolean
}>()
</script>
<template>
  <div
    class="w-8 h-8 border-4 border-red-900 shadow-lg mx-1 bg-transparent transition duration-300 ease-in-out transform group-hover:rotate-45 motion-reduce:transition-none motion-reduce:transform-none">
    <div class="absolute w-4 h-4 m-1 bg-red-800 shadow-lg'" :class="{ hidden }" />
  </div>
</template>