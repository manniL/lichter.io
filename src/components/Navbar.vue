<template>
    <nav class="flex items-center justify-between flex-wrap bg-red p-4 sticky pin-t z-10">
        <router-link to="/" class="flex items-center flex-no-shrink text-white mr-6 no-underline"
                     v-show="!showNavLinks">
            <i class="fa fa-2x fa-lightbulb-o mr-2"></i>
            <span class="font-semibold text-xl tracking-tight">Lichter.io</span>
        </router-link>
        <a href="#top" class="flex items-center flex-no-shrink text-white mr-6 no-underline"
           v-smooth-scroll="{ duration: 1000, offset: -50}" v-show="showNavLinks">
            <i class="fa fa-2x fa-lightbulb-o mr-2"></i>
            <span class="font-semibold text-xl tracking-tight">Lichter.io</span>
        </a>
        <div class="block lg:hidden" v-show="showNavLinks">
            <button class="flex items-center px-3 py-2 border rounded text-red-lighter border-red-light hover:text-white hover:border-white"
                    @click="toggleVisibility">
                <i class="fa fa-bars" title="Menu"></i>
            </button>
        </div>
        <div class="w-full lg:block flex-grow lg:flex lg:items-center lg:w-auto" :class="{'hidden': !isVisible}"
             v-show="showNavLinks">
            <div class="text-sm lg:flex-grow">
                <a href="#about-me" v-smooth-scroll="{ duration: 1000, offset: -50 }"
                   class="block mt-4 lg:inline-block lg:mt-0 text-red-lighter hover:text-white mr-4 no-underline">
                    About me
                </a>
                <a href="#skills" v-smooth-scroll="{ duration: 1000, offset: -50 }"
                   class="block mt-4 lg:inline-block lg:mt-0 text-red-lighter hover:text-white mr-4 no-underline">
                    Skills
                </a>
                <a href="#timeline" v-smooth-scroll="{ duration: 1000, offset: -50 }"
                   class="block mt-4 lg:inline-block lg:mt-0 text-red-lighter hover:text-white no-underline">
                    Timeline
                </a>
            </div>
            <div>
                <a @click="oops"
                   class="block mt-4 lg:inline-block lg:mt-0 text-red-lighter hover:text-white mr-4 no-underline cursor-pointer">
                    {{oopsText}}
                </a>
            </div>
        </div>
    </nav>
</template>
<script>
  export default {
    data () {
      return {
        isVisible: false,
        showOopsText: false
      }
    },
    computed: {
      oopsText () {
        return this.showOopsText ? 'Nah, I don\'t have one yet!' : 'I have a Blog too!'
      },
      showNavLinks () {
        return this.$route.path === '/'
      }
    },
    methods: {
      toggleVisibility () {
        this.isVisible = !this.isVisible
      },
      oops () {
        this.showOopsText = !this.showOopsText
        this.$ga.event('user-interactions', 'easter-eggs', 'blog', this.showOopsText)
      }
    }
  }
</script>