<template>
    <div>
        <navbar></navbar>
        <intro></intro>
        <about-me></about-me>
        <skills></skills>
        <timeline></timeline>
        <app-footer></app-footer>
    </div>
</template>

<script>
  import Navbar from './Navbar.vue'
  import Intro from './Intro.vue'
  import AboutMe from './AboutMe.vue'
  import Skills from './Skills.vue'
  import Timeline from './Timeline.vue'
  import AppFooter from './Footer.vue'

  export default {
    name: 'MainPage',
    components: {
      Navbar,
      Intro,
      AboutMe,
      Skills,
      Timeline,
      AppFooter
    }
  }
</script>