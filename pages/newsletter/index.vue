<script setup lang="ts">
definePageMeta({
  documentDriven: false
})

const title = 'Newsletter'
const description = 'Subscribe to my newsletter to get notified about new articles, talks, and other content I publish. No spam, I promise!'

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
      <AppParagraph look="heading" class="mt-4" tag="h1">{{ title }}</AppParagraph>
      <div class="md:flex md:gap-16">
        <div class="prose md:prose-lg lg:prose-xl pt-8 max-w-prose">
          <p>
            Want to make sure you don't miss any of my content? Subscribe to my newsletter to get notified about new
            articles, streams and videos!
            No spam, one message every two weeks, I promise!
          </p>
          <AppLink class="pb-32" to="#newsletter">Subscribe now in the footer</AppLink>
        </div>
      </div>
    </AppSection>
  </div>
</template>