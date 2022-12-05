
<script setup lang="ts">
const skills = [
  {
    skillTitle: 'Vue.js and Nuxt.js',
    rating: 5,
    items: [
      { text: 'Nuxt.js core maintainer ♥️️', strong: true },
      { text: 'Vue.js enthusiast' }
    ]
  },
  {
    skillTitle: 'Javascript',
    rating: 4,
    items: [
      { text: 'Express.js', strong: true },
      { text: 'ES6', strong: true },
      { text: 'Writing packages' },
      { text: 'Babel' },
      { text: 'Webpack' }
    ]
  },
  {
    skillTitle: 'PHP',
    rating: 4,
    items: [
      { text: 'Laravel', strong: true },
      { text: 'Wordpress' },
      { text: 'Drupal' }
    ]
  },
  {
    skillTitle: 'VC & CI',
    rating: 4,
    items: [
      { text: 'Git', strong: true },
      { text: 'Travis CI' }
    ]
  },
  {
    skillTitle: 'Methodologies',
    rating: 4,
    items: [
      { text: 'TDD', strong: true },
      { text: 'Clean Code' },
      { text: 'Agile' },
      { text: 'Scrum' }
    ]
  },
  {
    skillTitle: 'Python',
    rating: 3,
    items: [
      { text: 'flask', strong: true },
      { text: 'plotly' },
      { text: 'scikit-learn' },
      { text: 'pandas' }
    ]
  }
]
</script>

<template>
  <div v-scroll-reveal class="flex flex-wrap flex-col items-center bg-gray-300 py-16">
    <div class="flex justify-around w-5/6 md:w-1/2 mx-auto">
      <h2 class="text-2xl font-bold text-center">
        My Skillset
      </h2>
    </div>
    <div v-for="(_, i) in 3" :key="i" :class="{ 'md:my-2 md:h-32': i === 1, 'md:my-4': i !== 1 }"
      class="flex flex-col md:flex-row w-3/4 justify-around items-center md:mt-8">
      <SkillEntry :skill-title="skills[i * 2].skillTitle" :rating="skills[i * 2].rating" :items="skills[i * 2].items" />
      <div v-if="i === 1" class="flex justify-center w-1/3 h-auto">
        <div class="invisible xl:visible hidden xl:flex">
          <TechnologyImages />
        </div>
      </div>
      <div v-else class="hidden md:visible md:block xl:hidden xl:invisible w-1/3" />
      <SkillEntry :skill-title="skills[i * 2 + 1].skillTitle" :rating="skills[i * 2 + 1].rating" :items="skills[i * 2 + 1].items"
        is-right />
    </div>
  </div>
</template>
