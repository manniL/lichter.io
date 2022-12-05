<script setup lang="ts">
defineProps<{
  rating: 1 | 2 | 3 | 4 | 5
}>()
</script>

<template>
  <div class="flex group">
    <SkillRatingSquare v-for="i in 5" :key="i" :hidden="i > rating" />
  </div>
</template>