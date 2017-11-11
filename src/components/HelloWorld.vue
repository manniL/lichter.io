<template>

    <div>
        <navbar></navbar>
        <intro></intro>
        <timeline></timeline>
    </div>
</template>

<script>
  import Navbar from './Navbar.vue'
  import Intro from './Intro.vue'
  import Timeline from './Timeline.vue'

  export default {
    name: 'HelloWorld',
    components: {
      Navbar,
      Intro,
      Timeline
    },
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>