<script setup lang="ts">
import { onContentNotFound } from '~/utils/content.js';

const { page: workshop } = useContent()

useSeoMeta({
  title: () => workshop.value.title,
  description: () => workshop.value.description,  
  ogTitle: () => workshop.value.title,
  ogDescription: () => workshop.value.description,
})

onContentNotFound(workshop)

const requestQuoteLink = computed(() => {
  const prefix = 'mailto:alichter@developmint.de?subject=Workshop request: '
  const title = workshop.value.title
  const suffix = `&body=Hi Alex,%0D%0A%0D%0Awe would like to request a quote for the ${title} workshop.%0D%0A%0D%0A

  Desired/Possible dates: %0D%0A

  Location (remote/inhouse): %0D%0A

  Amount of participants: %0D%0A%0D%0A

  Further comments or info:%0D%0A
  `
  return prefix + title + suffix
})

defineOgImage({
  component: 'Workshop',
  title: workshop.value.title,
  time: workshop.value.time,
  attendees: workshop.value.attendees ?? 20,
  languages: workshop.value.languages ?? ['English', 'German'],
})

</script>

<template>
  <div>
    <AppSection class="bg-gradient-to-b from-black to-zinc-900 !pb-4">
      <AppLinkBack to="/workshops/">All Workshops</AppLinkBack>
      <ParagraphDecoration class="mt-4" />
      <AppParagraph class="mt-4" look="heading" tag="h1">
        {{ workshop.title }}
      </AppParagraph>
      <WorkshopDetails :time="workshop.time" class="mt-8 space-y-2 md:space-y-0 md:flex gap-8" />
    </AppSection>
    <AppSection class="bg-zinc-900 !pb-0" inner-class="border-b border-zinc-800">
      <div class="md:grid grid-cols-2 justify-center gap-8 pb-16">
        <div>
          <div class="prose md:prose-lg lg:prose-xl pt-0.5">
            <ContentDoc />
          </div>
          <AppButton :to="requestQuoteLink" class="hidden md:block mt-8 text-xl">Request quote</AppButton>
        </div>
        <div>
          <div class="flex flex-col items-center mt-12">
            <div>
              <img id="trainer" class="w-48 h-48 rounded-full mx-auto" width="192" height="192" src="/img/me@2x.jpg"
                alt="Photo of Alexander Lichter">
              <AppLink to="/about/" class="underline hover:no-underline">
                <AppParagraph class="mt-4 text-2xl text-center">
                  Alexander Lichter
                </AppParagraph>
              </AppLink>
              <AppParagraph class="mt-2 text-center">
                <b>Nuxt team member</b> &bull; Consultant &bull; Trainer
              </AppParagraph>
            </div>
            <AppButton :to="requestQuoteLink" class="mt-8 text-xl">Request quote</AppButton>
          </div>
        </div>
      </div>
    </AppSection>
  </div>
</template>