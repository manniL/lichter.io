<script setup lang="ts">
import { load } from 'cheerio';

definePageMeta({
  documentDriven: false
})

// disables indexing
defineRouteRules({
  robots: false,
})

type State = 'loading' | 'error' | 'subscribed'
const route = useRoute()
const state = ref<State>('loading')
const possibleError = ref()
onMounted(async () => {
  if (!route.query.email || !route.query.confirmation) {
    possibleError.value = new Error('Missing query parameters')
    state.value = 'error'
    return
  }

  try {
    await $fetch('/api/newsletter/confirm/', {
      method: 'POST',
      body: {
        email: route.query.email,
        confirmation: route.query.confirmation
      }
    })
    state.value = 'subscribed'
  } catch (error) {
    state.value = 'error'
    possibleError.value = error
  }
})
</script>

<template>
  <div>
    <AppSection>
      <ParagraphDecoration />
      <AppParagraph look="heading" class="mt-4 mb-8" tag="h1">Your Newsletter Subscription</AppParagraph>
      <AppParagraph look="heading" class="!text-3xl" tag="h2" v-if="state == 'loading'">
        Confirming your subscription...
        <Icon name="line-md:loading-loop" />
      </AppParagraph>
      <template v-else-if="state == 'error'">
        <AppParagraph look="heading" class="!text-3xl" tag="h2">Something went wrong</AppParagraph>
        <AppParagraph class="mt-4">
          I could not confirm your subscription. Error message:
        </AppParagraph>
        <AppParagraph class="text-red-200 mt-2" v-if="possibleError">
          {{ possibleError?.data?.message ?? possibleError.message }}
        </AppParagraph>
      </template>
      <template v-else>
        <AppParagraph look="heading" class="!text-3xl" tag="h2">Thank you for subscribing!</AppParagraph>
        <AppParagraph class="mt-4">
          You will receive an email with the next newsletter as soon as it is out.
        </AppParagraph>
      </template>
    </AppSection>
  </div>
</template>
