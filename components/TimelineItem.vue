<template>
  <li
    v-scroll-reveal
    :class="{'period mt-12 md:mt-0': period}"
    class="timeline-item"
  >
    <div
      v-if="!period"
      class="timeline-info"
    >
      <span v-text="when" />
    </div>
    <div
      v-if="!period"
      class="timeline-marker"
    />
    <div class="timeline-content">
      <h3
        v-if="!period"
        class="font-bold text-lg timeline-header"
        v-text="title"
      />
      <h2
        v-else
        class="font-bold text-xl timeline-header"
        v-text="title"
      />
      <p :class="period && 'mt-2'">
        <slot />
      </p>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    period: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: true
    },
    when: {
      type: String,
      default: ''
    }
  }
}
</script>
