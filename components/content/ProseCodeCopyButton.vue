<script setup lang="ts">
const props = withDefaults(defineProps<{
  content: string,
  baseClass?: string,
  iconClass?: string
}>(), {
  baseClass: 'absolute bottom-0 right-0 px-2 py-2 m-1 font-mono text-xs font-semibold leading-none rounded-lg copy text-warmgray-600 dark:text-warmgray-400 bg-warmgray-200 dark:bg-warmgray-700',
  iconClass: 'w-4 h-4'
})

const state = ref('init')

const onClick = async () => {
  await navigator.clipboard.writeText(props.content);

  state.value = 'copied'
  window.setTimeout(() => {
    state.value = 'init'
  }, 2000)
}
</script>

<template>
  <button
    :class="baseClass"
    type="button"
    name="Copy code to clipboard"
    @click="onClick"
  >
    <Icon :name="state === 'copied' ? 'uil:check': 'uil:copy'" :class="iconClass" />
  </button>
</template>