<template>
    <div class="flex flex-wrap flex-col bg-grey-lighter py-8">
        <div class="flex justify-around w-5/6 md:w-1/2 mx-auto">
            <h2 class="text-center mb-8 underline">Skills</h2>
        </div>
        <div class="flex flex-col md:flex-row justify-center items-center md:my-4">
            <div class="flex flex-col w-5/6 md:w-1/5 items-center md:items-stretch">
                <div class="flex flex-col-reverse md:flex-row items-center justify-start my-3">
                    <rating :rating="4"></rating>
                    <h2 class="text-center md:ml-3 mb-2 md:mb-0">PHP</h2>
                </div>
                <p class="text-small ml-1"><strong>Laravel</strong>, Wordpress, Drupal</p>
            </div>
            <div class="hidden md:visible flex w-1/5">
            </div>
            <div class="flex flex-col w-5/6 md:w-1/5 items-center md:items-stretch">
                <div class="flex flex-col md:flex-row items-center justify-end my-3">
                    <h2 class="text-center md:mr-3 mb-2 md:mb-0">Javascript</h2>
                    <rating :rating="4"></rating>
                </div>
                <p class="text-small text-right mr-1"><strong>Vue.js</strong>, ES6, Node.js, jQuery</p>
            </div>
        </div>
        <div class="flex flex-col md:flex-row justify-center items-center md:my-4">
            <div class="flex flex-col w-5/6 md:w-1/5 items-center md:items-stretch">
                <div class="flex flex-col-reverse md:flex-row items-center justify-start my-3">
                    <rating :rating="4"></rating>
                    <h2 class="text-center md:ml-3 mb-2 md:mb-0">VC & CI</h2>
                </div>
                <p class="text-small ml-1"><strong>Git</strong>, Travis CI</p>
            </div>
            <div class="hidden md:visible flex justify-center w-1/5">
                <technology-images></technology-images>
            </div>
            <div class="flex flex-col w-5/6 md:w-1/5 items-center md:items-stretch">
                <div class="flex flex-col md:flex-row items-center justify-end my-3">
                    <h2 class="text-center md:mr-3 mb-2 md:mb-0">Misc</h2>
                    <rating :rating="4"></rating>
                </div>
                <p class="text-small text-right mr-1"><strong>TDD</strong>, Agile, Scrum</p>
            </div>
        </div>
        <div class="flex flex-col md:flex-row justify-center items-center md:my-4">
            <div class="flex flex-col w-5/6 md:w-1/5 items-center md:items-stretch">
                <div class="flex flex-col-reverse md:flex-row items-center justify-start my-3">
                    <rating :rating="3"></rating>
                    <h2 class="text-center md:ml-3 mb-2 md:mb-0">Java</h2>
                </div>
                <p class="text-small ml-1">Spring, JPA</p>
            </div>
            <div class="hidden md:visible flex justify-center w-1/5">
            </div>
            <div class="flex flex-col w-5/6 md:w-1/5 items-center md:items-stretch">
                <div class="flex flex-col md:flex-row items-center justify-end my-3">
                    <h2 class="text-center md:mr-3 mb-2 md:mb-0">Python</h2>
                    <rating :rating="2"></rating>
                </div>
                <p class="text-small text-right mr-1">scikit-learn, pandas</p>
            </div>
        </div>
    </div>
</template>

<script>
  import Rating from './Rating.vue'
  import TechnologyImages from './TechnologyImages.vue'

  export default {
    components: {Rating, TechnologyImages}
  }
</script>