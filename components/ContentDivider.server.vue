<script setup lang="ts">
  withDefaults(defineProps<{
    anchor?: 'left' | 'right'
  }>(), {
    anchor: 'right'
  })
</script>

<template>
  <div class="absolute w-full z-10" :class="anchor === 'left' ? 'left-0' : 'right-0'">
      <div class="flex items-center justify-end" :class="{
        'flex-row-reverse': anchor === 'left'
      }">
        <span class="w-1.5 h-20 bg-gradient-to-b from-red-600 to-pink-700 z-10" />
        <span class="w-1/2 border-b border-dashed border-gray-500" :class="anchor === 'left' && '-mr-1.5'" />
      </div>
    </div>
</template>