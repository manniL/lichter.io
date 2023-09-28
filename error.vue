<script setup lang="ts">
const props = defineProps<{
  error: unknown
}>()

useHead({
  bodyAttrs: {
    class: 'bg-black antialiased min-h-screen text-white'
  },
})

const statusCode = computed(() => {
  if(typeof props.error !== 'object' || props.error === null) {
    return 500
  }
  if('statusCode' in props.error) {
    return props.error.statusCode 
  }
  return 500
})

const message = computed(() => {
  if(typeof props.error !== 'object' || props.error === null) {
    return 'Unknown error'
  }
  if('statusMessage' in props.error) {
    return props.error.statusMessage
  }
  if('message' in props.error) {
    return props.error.message
  }
  return 'Unknown error'
})

</script>

<template>
  <div>
    <AppNavbar />
    <AppSection class="mt-8 prose md:prose-lg lg:prose-xl">
      <ParagraphDecoration />
      <AppParagraph look="heading" class="mt-4" tag="h1">Error {{ statusCode }}</AppParagraph>
      <AppParagraph look="subParagraph" tag="p"> {{ message }}</AppParagraph>
      <AppLink to="/" class="mt-16">Go back to the home page</AppLink>
    </AppSection>
    <AppFooter />
  </div>
</template>