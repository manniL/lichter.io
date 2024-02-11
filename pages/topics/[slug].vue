<script setup lang="ts">
import type { QueryBuilderParams } from '@nuxt/content/dist/runtime/types'
import { onContentNotFound } from '~/utils/content.js'

const { page } = useContent()

onContentNotFound(page)

const route = useRoute()

const baseQuery = {
  where: [{ topics: { $contains: route.params.slug } }]
}

const articleQuery: QueryBuilderParams = {
  ...baseQuery,
  path: '/articles/',
  sort: [{
    dateModified: -1,
    datePublished: -1
  }]
}

const speakingQuery: QueryBuilderParams = {
  ...baseQuery,
  path: '/speaking/',
  sort: [{
    date: -1,
  }]
}

const workshopQuery: QueryBuilderParams = {
  ...baseQuery,
  path: '/workshops/'
}

const title = `Topic: ${page.value.title}`
const description = `Being it talks, workshops, panels, podcasts or blog posts, here you can find all my content sorted by topic.`

useSeoMeta({
  title,
  description,
})

defineOgImageComponent('Speaking')
</script>
<template>
  <div>
    <AppSection class="bg-gradient-to-b !pb-4">
      <AppLinkBack to="/topics/">To topic selection</AppLinkBack>
      <ParagraphDecoration class="mt-4" />
      <AppParagraph class="mt-4" look="heading" tag="h1">
        Topic: {{ page.title }}
      </AppParagraph>
    </AppSection>
    <AppSection class="justify-center pb-8">
      <ContentList :query="workshopQuery">
        <template #default="{ list }">
          <AppParagraph class="pt-16 !text-4xl" look="heading" tag="h2">
            Workshops
          </AppParagraph>
          <div class="space-y-8 md:space-y-0 md:grid grid-cols-2 gap-12 justify-around my-8">
            <WorkshopPreview v-for="entry in list" :key="entry._path" :workshop="entry" />
          </div>
        </template>
        <template #not-found></template>
      </ContentList>

      <ContentList :query="articleQuery">
        <template #default="{ list }">
          <AppParagraph class="pt-16 !text-4xl" look="heading" tag="h2">
            Articles
          </AppParagraph>
          <div class="grid md:grid-cols-2 gap-y-16 md:gap-8 my-8">
            <ArticlePreview v-for="entry in list" :key="entry._path" :article="entry" />
          </div>
        </template>
        <template #not-found></template>
      </ContentList>

      <ContentList :query="speakingQuery">
        <template #default="{ list }">
          <AppParagraph class="pt-16 !text-4xl" look="heading" tag="h2">
            Talks & Podcasts
          </AppParagraph>
          <div class="space-y-8 my-8">
            <SpeakingPreview v-for="entry in list" :key="entry._path" :talk="entry" />
          </div>
        </template>
        <template #not-found></template>
      </ContentList>
    </AppSection>
  </div>
</template>