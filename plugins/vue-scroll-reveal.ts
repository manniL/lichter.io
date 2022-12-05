export default defineNuxtPlugin(async (nuxtApp) => {
  if (process.client) {
    const { vScrollReveal } = await import("~/directives/reveal")
    nuxtApp.vueApp.directive('scroll-reveal', vScrollReveal);
  } else {
    nuxtApp.vueApp.directive('scroll-reveal', {
      getSSRProps () {
        return { class: 'invisible' }
      }
    });
  }
})
