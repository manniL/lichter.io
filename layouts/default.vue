<template>
  <div>
    <if-bot>
      <consent
        message="I use Cookies for user analysis and on-page improvements!"
        link-label="Learn about cookies"/>
    </if-bot>
    <navbar/>
    <nuxt/>
    <app-footer/>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar'
import AppFooter from '~/components/Footer'
import Consent from '~/node_modules/vue-cookieconsent-component/src/components/CookieConsent'
import IfBot from 'vue-if-bot'

export default {
  components: {
    IfBot,
    Consent,
    Navbar,
    AppFooter
  }
}
</script>
