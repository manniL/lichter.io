<template>
    <div>
        <navbar></navbar>
        <a id="top"></a>
        <intro></intro>
        <a id="about-me"></a>
        <about-me></about-me>
        <a id="skills"></a>
        <skills></skills>
        <a id="timeline"></a>
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