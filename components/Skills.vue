<template>
  <div
    v-scroll-reveal
    class="flex flex-wrap flex-col items-center bg-gray-300 py-8"
  >
    <div class="flex justify-around w-5/6 md:w-1/2 mx-auto">
      <h2 class="text-2xl font-bold text-center mb-8 underline">
        Skills
      </h2>
    </div>
    <div
      v-for="(_,i) in 3"
      :key="i"
      :class="{'md:my-2 md:h-32':i === 1, 'md:my-4':i !== 1}"
      class="flex flex-col md:flex-row w-3/4 justify-around items-center"
    >
      <Skill
        :title="$options.skills[i*2].title"
        :rating="$options.skills[i*2].rating"
        :items="$options.skills[i*2].items"
      />
      <div
        v-if="i === 1"
        class="flex justify-center w-1/3 h-auto"
      >
        <div class="invisible xl:visible hidden xl:flex">
          <TechnologyImages />
        </div>
      </div>
      <div
        v-else
        class="hidden md:visible md:block xl:hidden xl:invisible flex w-1/3"
      />
      <Skill
        :title="$options.skills[i*2+1].title"
        :rating="$options.skills[i*2+1].rating"
        :items="$options.skills[i*2+1].items"
        :right="true"
      />
    </div>
  </div>
</template>

<script>
import Skill from '~/components/skills/Skill.vue'
import TechnologyImages from '~/components/TechnologyImages.vue'

export default {
  components: { Skill, TechnologyImages },
  skills: [
    {
      title: 'Vue.js and Nuxt.js',
      rating: 5,
      items: [
        { text: 'Nuxt.js team member ♥️️', strong: true },
        { text: 'Vue.js enthusiast' }
      ]
    },
    {
      title: 'Javascript',
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
      title: 'PHP',
      rating: 4,
      items: [
        { text: 'Laravel', strong: true },
        { text: 'Wordpress' },
        { text: 'Drupal' }
      ]
    },
    {
      title: 'VC & CI',
      rating: 4,
      items: [
        { text: 'Git', strong: true },
        { text: 'Travis CI' }
      ]
    },
    {
      title: 'Methodologies',
      rating: 4,
      items: [
        { text: 'TDD', strong: true },
        { text: 'Clean Code' },
        { text: 'Agile' },
        { text: 'Scrum' }
      ]
    },
    {
      title: 'Python',
      rating: 3,
      items: [
        { text: 'dash', strong: true },
        { text: 'plotly' },
        { text: 'scikit-learn' },
        { text: 'pandas' }
      ]
    }
  ]
}
</script>
