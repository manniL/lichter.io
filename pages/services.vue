<script setup lang="ts">
definePageMeta({
  documentDriven: false
})

const title = 'Services'
const description = 'Take a look at the services I offer, including web engineering consulting, workshops for various topics and more.'

useSeoMeta({
  title,
  description,
})

defineOgImageComponent('General')
</script>

<template>
  <div>
    <AppSection>
      <ParagraphDecoration />
      <AppParagraph look="heading" class="mt-4" tag="h1">Services</AppParagraph>
      <div class="flex flex-col items-center md:flex-row my-16 gap-16">
        <ServicePreview class="max-w-xl bg-zinc-900 p-8" icon="mdi:lightbulb-on-outline" title="Consulting" to="/consulting">
          Companies reach out to help them build better Vue and Nuxt applications
          - from solving problems to discussing the right abstractions and architecture.
        </ServicePreview>
        <ServicePreview class="max-w-xl bg-zinc-900 p-8" icon="ph:chalkboard-teacher-light" title="Workshops" to="/workshops">
          Want to level up your team's skills? I offer workshops on Vue, Nuxt, TypeScript, Testing, and more topics.
          Don't hesitate to reach out and let's discuss your needs.
        </ServicePreview>
      </div>
      <div class="flex justify-center">
        <ServicePreview class="max-w-xl bg-zinc-900 p-8" icon="mdi:help-circle-outline" title="Something else" to="/contact">
          Problems are not always easy to categorize. If you have a problem that you think I can help you with,
          don't hesitate to reach out, and let's discuss your needs.
        </ServicePreview>
      </div>
    </AppSection>
  </div>
</template>