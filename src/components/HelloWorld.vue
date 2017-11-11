<template>

    <div>
        <navbar></navbar>
        <timeline></timeline>
    </div>
</template>

<script>
  import Navbar from './Navbar.vue'
  import Timeline from './Timeline.vue'

  export default {
    name: 'HelloWorld',
    components: {
      Navbar,
      Timeline
    },
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>