<template>
  <div
    v-scroll-reveal
    class="flex flex-wrap flex-col items-center bg-grey-lighter py-8">
    <div class="flex justify-around w-5/6 md:w-1/2 mx-auto">
      <h2 class="text-center mb-8 underline">Skills</h2>
    </div>
    <div
      v-for="(_,i) in 3"
      :key="i"
      :class="{'md:my-2 md:h-32':i === 1, 'md:my-4':i !== 1}"
      class="flex flex-col md:flex-row w-3/4 justify-around items-center">
      <skill
        :title="$options.skills[i*2].title"
        :rating="$options.skills[i*2].rating"
        :items="$options.skills[i*2].items"/>
      <div
        v-if="i === 1"
        class="flex justify-center w-1/3 h-auto">
        <div class="invisible xl:visible hidden xl:flex">
          <technology-images/>
        </div>
      </div>
      <div
        v-else
        class="hidden md:visible flex w-1/3"/>
      <skill
        :title="$options.skills[i*2+1].title"
        :rating="$options.skills[i*2+1].rating"
        :items="$options.skills[i*2+1].items"
        :right="true"/>
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
      title: 'PHP',
      rating: 4,
      items: [
        { text: 'Laravel', strong: true },
        { text: 'Wordpress' },
        { text: 'Drupal' }
      ]
    },
    {
      title: 'Javascript',
      rating: 4,
      items: [
        { text: 'Vue.js', strong: true },
        { text: 'Nuxt.js' },
        { text: 'Node.js' },
        { text: 'ES6' }
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
      title: 'Java',
      rating: 3,
      items: [
        { text: 'Spring' },
        { text: 'JPA' }
      ]
    },
    {
      title: 'Python',
      rating: 2,
      items: [
        { text: 'scikit-learn' },
        { text: 'pandas' }
      ]
    }
  ]
}
</script>
