<script setup lang="ts">
definePageMeta({
  documentDriven: false
})

const title = 'Support me'
const description = 'If you like my content and want to support me, you can do so via a donation or by buying me a coffee.'

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
      <AppParagraph look="heading" class="mt-4" tag="h1">Sponsors</AppParagraph>
      <div class="md:flex">
        <div class="mt-8 prose md:prose-lg lg:prose-xl max-w-prose">
          <p>
            Spending time on open source projects and writing articles takes a lot of time and effort.
            I am happy to share my knowledge and experience with you and I hope you find it useful.
          </p>

          <p>
            I am very grateful for the support of my sponsors.
            If you want to become a sponsor, you can do so via my
            <AppLink class="inline-block" to="https://github.com/sponsors/manniL">
              GitHub Sponsors Profile
            </AppLink>. Every contribution is highly appreciated and will be displayed here (unless set to anonymous)! 
          </p>

          <p>Thanks a lot to everybody supporting open source!</p>
        </div>
        <div class="mt-16 md:mt-0">
          <img src="https://raw.githubusercontent.com/manniL/static/main/sponsors.svg">
        </div>
      </div>
    </AppSection>
  </div>
</template>