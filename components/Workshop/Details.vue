<script setup lang="ts">
const props = withDefaults(defineProps<{
  time?: string
  attendees?: number
  languages?: string[]
  noTrainer?: boolean
}>(), {
  time: '2 days',
  attendees: 20,
  languages: () => ['English', 'German']
})

const formattedLanguages = computed(() => {
  const languages = props.languages
  if (languages.length === 1) {
    return languages[0]
  }
  return `${languages.slice(0, -1).join(', ')} or ${languages.slice(-1)}`
})
</script>

<template>
  <div>
    <p>
      <Icon class="text-2xl mr-2" name="heroicons:clock" /> {{ time }}
    </p>
    <p>
      <Icon class="text-2xl mr-2" name="heroicons:user-group" /> max. {{ attendees }}
    </p>
    <p>
      <Icon class="text-2xl mr-2" name="heroicons:language" /> {{ formattedLanguages }}
    </p>
    <p>
      <NuxtLink v-if="!noTrainer" to="#trainer" class="group">
        <Icon class="text-2xl mr-2" name="ph:chalkboard-teacher-light" /> <span
          class="underline group-hover:no-underline">Alexander Lichter</span>
      </NuxtLink>
    </p>
  </div>
</template>