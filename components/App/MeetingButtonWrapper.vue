<script setup lang="ts">
import { cloneVNode } from 'vue';

const props = defineProps<{
  meeting: string
}>()

const slots = useSlots()
const Comp = () => {
  const slot = slots.default?.()[0]
  if (!slot) {
    return
  }
  const node = cloneVNode(slot, { 
    'data-cal-link': `alichter/${props.meeting}` })
  return node
}
</script>

<template>
  <Comp />
</template>