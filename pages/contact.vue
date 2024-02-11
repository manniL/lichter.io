<script setup lang="ts">
definePageMeta({
  documentDriven: false
})

const title = 'Contact me'
const description = 'Reach out for a project or consulting inquiry, to give feedback or just to say hi. Easiest via email or one of the social media platforms below'

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
      <AppParagraph look="heading" class="mt-4" tag="h1">Contact</AppParagraph>
      <AppParagraph class="mt-16 text-lg max-w-prose">
        <b>Hey there!</b> I'm always happy to hear from you. If you have any questions, or feedback or just want to say
        hi,
        feel
        free to reach out to me on any of the platforms linked in the footer or via email at inquiry at lichter dot io.
      </AppParagraph>
      <AppParagraph class="mt-12 text-lg max-w-prose">
        You can also <AppMeetingButtonWrapper meeting="intro-website"><button
            class="underline hover:no-underline">schedule a meeting with me</button></AppMeetingButtonWrapper> easily!
      </AppParagraph>
      <AppParagraph class="mt-12 text-lg max-w-prose">
        I usually respond within 24 to 48 hours.
      </AppParagraph>
    </AppSection>
  </div>
</template>