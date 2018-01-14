<template>
    <div class="flex flex-wrap flex-col items-center bg-grey-lighter py-8" v-scroll-reveal>
        <div class="flex justify-around w-5/6 md:w-1/2 mx-auto">
            <h2 class="text-center mb-8 underline">Skills</h2>
        </div>
        <div class="flex flex-col md:flex-row w-3/4 justify-around items-center md:my-4">
            <div class="flex flex-col w-5/6 md:w-1/3 items-center lg:items-stretch">
                <div class="flex flex-col-reverse lg:flex-row items-center justify-start my-6">
                    <rating :rating="4"/>
                    <h2 class="text-center lg:ml-3 mb-2 lg:mb-0">PHP</h2>
                </div>
                <p class="text-small ml-1"><strong>Laravel</strong>, Wordpress, Drupal</p>
            </div>
            <div class="hidden md:visible flex w-1/3">
            </div>
            <div class="flex flex-col w-5/6 md:w-1/3 items-center lg:items-stretch">
                <div class="flex flex-col lg:flex-row items-center justify-end my-6">
                    <h2 class="text-center lg:mr-3 mb-2 lg:mb-0">Javascript</h2>
                    <rating :rating="4"/>
                </div>
                <p class="text-small text-right mr-1"><strong>Vue.js</strong>, ES6, Node.js, jQuery</p>
            </div>
        </div>
        <div class="flex flex-col md:flex-row w-3/4 justify-around items-center md:my-2 md:h-32">
            <div class="flex flex-col w-5/6 md:w-1/3 items-center lg:items-stretch">
                <div class="flex flex-col-reverse lg:flex-row items-center justify-start my-6">
                    <rating :rating="4"/>
                    <h2 class="text-center lg:ml-3 mb-2 lg:mb-0">VC & CI</h2>
                </div>
                <p class="text-small ml-1"><strong>Git</strong>, Travis CI</p>
            </div>
            <div class="flex justify-center w-1/3 h-auto">
                <div class="invisible xl:visible hidden xl:flex">
                    <technology-images/>
                </div>
            </div>
            <div class="flex flex-col w-5/6 md:w-1/3 items-center lg:items-stretch">
                <div class="flex flex-col lg:flex-row items-center justify-end my-6">
                    <h2 class="text-center lg:mr-3 mb-2 lg:mb-0">Methodologies</h2>
                    <rating :rating="4"/>
                </div>
                <p class="text-small text-right mr-1"><strong>TDD</strong>, Clean Code, Agile, Scrum</p>
            </div>
        </div>
        <div class="flex flex-col md:flex-row w-3/4 justify-around items-center md:my-4">
            <div class="flex flex-col w-5/6 md:w-1/3 items-center lg:items-stretch">
                <div class="flex flex-col-reverse lg:flex-row items-center justify-start my-6">
                    <rating :rating="3"/>
                    <h2 class="text-center lg:ml-3 mb-2 lg:mb-0">Java</h2>
                </div>
                <p class="text-small ml-1">Spring, JPA</p>
            </div>
            <div class="hidden md:visible flex justify-center w-1/3">
            </div>
            <div class="flex flex-col w-5/6 md:w-1/3 items-center lg:items-stretch">
                <div class="flex flex-col lg:flex-row items-center justify-end my-6">
                    <h2 class="text-center lg:mr-3 mb-2 lg:mb-0">Python</h2>
                    <rating :rating="2"/>
                </div>
                <p class="text-small text-right mr-1">scikit-learn, pandas</p>
            </div>
        </div>
    </div>
</template>

<script>
  import Rating from '~/components/Rating.vue'
  import TechnologyImages from '~/components/TechnologyImages.vue'

  export default {
    components: {Rating, TechnologyImages}
  }
</script>