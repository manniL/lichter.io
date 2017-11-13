<template>
    <div class="flex flex-col items-center">
        <img :src="imagePath" class="rounded-full">
        <p class="text-sm">{{urls[currentUrlIndex].name}}</p>
    </div>
</template>
<script>
  export default {
    props: {
      urls: {
        type: Array,
        default: () => [
          {name: 'Laravel', url: './laravel.png'},
          {name: 'Bootstrap', url: './bootstrap.png'},
          {name: 'Git', url: './git.png'},
          {name: 'Travis CI', url: './travisci.png'},
          {name: 'Tailwind', url: './tailwind.png'},
          {name: 'Node', url: './node.png'},
          {name: 'Webpack', url: './webpack.png'}
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
        const url = this.urls[this.currentUrlIndex].url
        if (url.startsWith('http')) {
          return url
        }
        const pathToImg = require.context('../assets/', true)
        return pathToImg(url, true)
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