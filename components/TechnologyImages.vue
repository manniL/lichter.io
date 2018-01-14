<template>
    <transition name="custom" enter-active-class="animated fade-in"
                enter-to-class="animated pulse" leave-active-class="animated fade-out"
                mode="out-in">
        <div class="flex flex-col items-center" :key="currentUrlIndex">
            <img :src="imagePath" width="124" height="124">
            <p class="text-lg text-grey-darker">{{urls[currentUrlIndex].name}}</p>
        </div>
    </transition>
</template>
<script>
  export default {
    props: {
      urls: {
        type: Array,
        default: () => [
          {name: 'Laravel', url: '/img/laravel.png'},
          {name: 'Vue.js', url: '/img/vuejs.png'},
          {name: 'Bootstrap', url: '/img/bootstrap.png'},
          {name: 'Git', url: '/img/git.png'},
          {name: 'Travis CI', url: '/img/travisci.png'},
          {name: 'Tailwind', url: '/img/tailwind.png'},
          {name: 'Node.js', url: '/img/node.png'},
          {name: 'Webpack', url: '/img/webpack.png'}
        ]
      },
      interval: {
        type: Number,
        default: 5
      }
    },
    data () {
      return {
        currentUrlIndex: 0
      }
    },
    computed: {
      imagePath () {
        return this.urls[this.currentUrlIndex].url
      }
    },
    methods: {
      incrementUrlIndex () {
        this.currentUrlIndex = (this.currentUrlIndex + 1) % this.urls.length
      }
    },
    created () {
      setInterval(this.incrementUrlIndex, this.interval * 1000)
    }
  }
</script>