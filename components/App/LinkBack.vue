<script setup lang="ts">
  defineProps<{
    to: string
  }>()
</script>

<template>
  <AppLink :to="to" class="mt-16 block text-zinc-400 group">
    <Icon name="heroicons:chevron-double-left" class="mb-1 mr-1 -ml-0.5" /> <span class="group-hover:underline"><slot/></span>
  </AppLink>
</template>