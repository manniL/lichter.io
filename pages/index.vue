<template>
    <div>
        <a id="top"></a>
        <intro></intro>
        <a id="about-me"></a>
        <about-me></about-me>
        <a id="skills"></a>
        <skills></skills>
        <a id="timeline"></a>
        <timeline></timeline>
    </div>
</template>

<script>
  import Navbar from '~/components/Navbar.vue'
  import Intro from '~/components/Intro.vue'
  import AboutMe from '~/components/AboutMe.vue'
  import Skills from '~/components/Skills.vue'
  import Timeline from '~/components/Timeline.vue'
  import AppFooter from '~/components/Footer.vue'

  export default {
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