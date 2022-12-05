<template>
  <div class="flex flex-col w-5/6 md:w-1/3 items-center lg:items-stretch">
    <div :class="{ 'lg:flex-row': !isRight, 'lg:flex-row-reverse': isRight }"
      class="flex flex-col-reverse items-center justify-start my-6">
      <SkillRating :rating="rating" />
      <h2 :class="{ 'lg:ml-3': !isRight, 'lg:mr-3': isRight }" class="text-xl font-semibold text-center mb-2 lg:mb-0"
        v-text="skillTitle" />
    </div>
    <!-- eslint-disable vue/no-v-html -->
    <p :class="isRight ? 'lg:ml-auto mr-1' : 'lg:mr-auto ml-1'" class="text-small text-center lg:text-left"
      v-html="itemString" />
    <!-- eslint-enable vue/no-v-html -->
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  skillTitle: string,
  rating: number,
  items: { strong?: boolean, text: string }[]
  isRight?: boolean
}
>()

const itemString = computed(() =>
  props.items
    .map(i => i.strong
      ? `<strong>${i.text}</strong>`
      : i.text)
    .join(', ')
)
</script>
