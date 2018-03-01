<template>
  <li
    v-scroll-reveal
    :class="{'period': period}"
    class="timeline-item">
    <div
      v-if="!period"
      class="timeline-info">
      <span>{{ when }}</span>
    </div>
    <div
      v-if="!period"
      class="timeline-marker"/>
    <div class="timeline-content">
      <h3
        v-if="!period"
        class="timeline-header">{{ title }}</h3>
      <h2
        v-else
        class="timeline-header mb-2">{{ title }}</h2>
      <p>
        <slot/>
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
      default: ''
    },
    when: {
      type: String,
      default: ''
    }
  }
}
</script>
