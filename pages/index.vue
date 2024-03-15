<script setup lang="ts">
import type { ArticlePreview, TalkPreview } from '~/types.js';

definePageMeta({
  documentDriven: false
})

const description = `I am Alex, a German web engineering consultant based in Amsterdam. I help companies to build better web applications and to improve their knowledge, workflows, and culture. My expertise in JavaScript, TypeScript, Vue.js, and Nuxt.js is highly valued by clients all around the world`

useSeoMeta({
  title: '',
  ogTitle: 'Alexander Lichter - Web Engineering Consultant',
  description,
  ogDescription: description
})

defineOgImageComponent('Main')

const { data: articles } = useAsyncData('latest-articles', () => queryContent<ArticlePreview>('/articles').sort({
  dateModified: -1,
  datePublished: -1
}).without(['body', 'excerpt']).limit(4).find())

const { data: talks } = useAsyncData('latest-speaking', () => queryContent<TalkPreview>('/speaking/').sort({
  date: -1
}).without(['body', 'excerpt']).limit(5).find())

const { data: workshops } = useAsyncData('latest-workshops', () => queryContent('/workshops/').sort({
  onStartPage: 1
}).without(['body', 'excerpt']).limit(3).find())
</script>

<template>
  <div>
    <AppSection>
      <div class="md:flex md:flex-row items-center">
        <div class="mt-8 md:mt-0 md:w-3/5">
          <div class="flex gap-8 -mx-4 md:mx-0">
            <div class="flex w-1/2 md:w-full items-center">
              <AppParagraph tag="h1" look="superHeading"
                class="flex flex-col sm:justify-start font-mono mt-8 md:mt-0 ml-4 md:ml-0">
                <span>Build <span class="hidden md:inline md:ml-5 pl-8">//</span></span>
                <span>Lead <span class="hidden md:inline md:ml-8 pl-8">//</span></span>
                <span>Teach</span>
              </AppParagraph>
            </div>
            <div class="md:hidden w-1/2">
              <NuxtPicture format="avif,webp,png" width="358" height="468" densities="x1 x2" placeholder :img-attrs="{ class: 'z-20 relative' }"
                src="/img/alex-main.png" alt="Photo of Alexander Lichter" />
            </div>
          </div>
          <AppParagraph look="subParagraph" class="mt-8">
            Hey! I am Alex, a web engineering consultant based in Amsterdam.
            I help companies to build better web applications and to improve their knowledge, workflows, and culture.
          </AppParagraph>
          <AppParagraph look="subParagraph" class="mt-6">
            My expertise in JavaScript, TypeScript, Vue.js, and Nuxt.js is highly valued by clients all around the world.
          </AppParagraph>
          <div class="mt-8 flex">
            <AppMeetingButtonWrapper meeting="intro-website">
              <AppButton class="mr-4">Schedule meeting</AppButton>
            </AppMeetingButtonWrapper>
            <AppButton to="/about/" look="secondary">About <span class="hidden sm:inline">me</span></AppButton>
          </div>
          <div class="hidden md:flex mt-16 filter text-4xl gap-8">
            <AppLink title="To the Nuxt topic page" to="/topics/nuxt">
              <Icon class="grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all"
                name="logos:nuxt-icon" />
            </AppLink>
            <AppLink title="To the Vue topic page" to="/topics/vue">
              <Icon class="grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all" name="logos:vue" />
            </AppLink>
            <AppLink title="To the TypeScript topic page" to="/topics/typescript">
              <Icon class="grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all"
                name="logos:typescript-icon" />
            </AppLink>
            <AppLink title="To the Tailwind CSS topic page" to="/topics/tailwind">
              <Icon class="grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all"
                name="logos:tailwindcss-icon" />
            </AppLink>
          </div>
        </div>
        <div class="w-1/2 md:w-2/5 md:flex-1 h-full hidden md:flex justify-end items-center md:ml-32 md:mt-8">
          <NuxtPicture format="avif,webp,png" width="544" height="710" densities="x1 x2" placeholder :img-attrs="{ class: 'z-20 relative' }"
            src="/img/alex-main.png" alt="Photo of Alexander Lichter" />
        </div>
      </div>
      <ContentDivider class="mt-16 md:-mt-10" />
    </AppSection>
    <AppSection class="my-32">
      <div class="flex flex-col gap-16 md:gap-8 md:flex-row justify-around">
        <LazyServicePreview icon="mdi:lightbulb-on-outline" title="Consulting" to="/consulting">
          Companies reach out to help them build better Vue and Nuxt applications
          - from solving problems to discussing the right abstractions and architecture.
        </LazyServicePreview>
        <LazyServicePreview icon="ph:chalkboard-teacher-light" title="Workshops" to="/workshops">
          Want to level up your team's skills? I offer workshops on Vue, Nuxt, TypeScript, testing and more topics.
          Don't hesitate to reach out and let's discuss your needs.
        </LazyServicePreview>
        <LazyServicePreview icon="ph:microphone" title="Public speaking" to="/speaking">
          I love to share my knowledge and experience with the community.
          I speak at conferences and meetups, and I am always open to new opportunities.
        </LazyServicePreview>
      </div>
      <ContentDivider class="mt-32" anchor="left" />
    </AppSection>
    <AppSection class="mt-48 md:mt-32">
      <LazyParagraphDecoration />
      <AppParagraph class="mr-8 mt-4" tag="h2" look="heading">
        Workshops
      </AppParagraph>
      <div class="flex flex-col gap-8 md:gap-0 md:flex-row justify-between">
        <AppParagraph look="subParagraph" class="mt-8 max-w-xl">
          Take your team's skills to the next level with my workshops on Vue, Nuxt, TypeScript, testing and various other
          topics.
        </AppParagraph>
        <div>
          <AppButton to="/workshops/" look="secondary">Discover all Workshops</AppButton>
        </div>
      </div>
      <div class="flex flex-col md:flex-row gap-16 md:gap-8 justify-around mt-8">
        <LazyWorkshopPreview class="flex-1" v-for="workshop in workshops" :workshop="workshop" />
      </div>
      <ContentDivider class="mt-14" />
    </AppSection>
    <AppSection class="bg-zinc-900">
      <LazyParagraphDecoration class="mt-16" />
      <AppParagraph class="mr-8 mt-4" tag="h2" look="heading">
        Articles
      </AppParagraph>
      <div class="flex flex-col gap-8 md:gap-0 md:flex-row justify-between">
        <AppParagraph look="subParagraph" class="mt-8 max-w-xl">
          I love to share my knowledge and experience with the community.
          Have a look at my latest articles below.
        </AppParagraph>
        <div>
          <AppButton to="/articles" look="secondary" secondary-after-bg="bg-zinc-900">View all articles</AppButton>
        </div>
      </div>
      <div class="grid md:grid-cols-2 gap-12 justify-around mt-8">
        <ArticlePreview v-for="article in articles" :key="article._id" :article="article" />
      </div>
      <div class="flex md:justify-end mt-8">
        <AppButton to="/articles" look="secondary" secondary-after-bg="bg-zinc-900">View all articles</AppButton>
      </div>
      <ContentDivider anchor="left" class="mt-14" />
    </AppSection>
    <AppSection>
      <LazyParagraphDecoration class="mt-16" />
      <AppParagraph class="mr-8 mt-4" tag="h2" look="heading">
        Speaking
      </AppParagraph>
      <div class="flex flex-col gap-8 md:gap-0 md:flex-row justify-between">
        <AppParagraph look="subParagraph" class="mt-8 max-w-xl">
          Check out my latest talks, podcast episodes and other appearances, as well as upcoming events.
        </AppParagraph>
        <div>
          <AppButton to="/speaking/" look="secondary">View all talks</AppButton>
        </div>
      </div>
      <div class="flex flex-col space-y-8 mt-8">
        <LazySpeakingPreview v-for="talk in talks" :key="talk._id" :talk="talk" />
      </div>
      <div class="flex md:justify-end mt-16">
        <AppButton to="/speaking/" look="secondary">View all talks</AppButton>
      </div>
    </AppSection>
  </div>
</template>