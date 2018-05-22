<template>
  <div>
    <no-ssr>
      <consent
        message="I use Cookies for user analysis and on-page improvements!"
        link-label="Learn about cookies"/>
    </no-ssr>
    <navbar/>
    <nuxt/>
    <app-footer/>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar'
import AppFooter from '~/components/Footer'
import Consent from '~/node_modules/vue-cookieconsent-component/src/components/CookieConsent'

export default {
  components: {
    Consent,
    Navbar,
    AppFooter
  }
}
</script>
