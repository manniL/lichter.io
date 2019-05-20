<template>
  <div>
    <IfBot>
      <Consent
        message="I use Cookies for user analysis and on-page improvements!"
        link-label="Privacy Policy"
        href="https://lichter.io/privacy/"
      />
    </IfBot>
    <Navbar />
    <Nuxt />
    <AppFooter />
  </div>
</template>

<script>
import Navbar from '~/components/Navbar'
import Consent from 'vue-cookieconsent-component/src/components/CookieConsent.vue'
import IfBot from 'vue-if-bot/dist/vue-if-bot.es'

export default {
  components: {
    IfBot,
    Consent,
    Navbar,
    AppFooter: () => import('~/components/Footer')
  }
}
</script>

<style lang="postcss">
  .cookie-consent {
    @apply .w-full .py-2 .z-10 .flex .items-center .justify-center .bg-red-900 .text-red-200 .text-xs;

    @screen md {
      @apply .text-sm .text-center;
    }

    position: sticky;

    &-link {
      @apply .text-red-100 .underline;
      &:hover {
        @apply .no-underline;
      }
    }

    &-message,
    &-compliance {
      @apply .mx-2 .my-1 .px-2;

      @screen md {
        @apply .px-4;
      }
    }

    &-compliance {
      @apply .cursor-pointer .text-white .py-2 .rounded .border-white .border;

      &:hover {
        @apply bg-white .text-black;
      }
    }
  }
</style>
