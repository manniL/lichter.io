<template>
  <li
    v-scroll-reveal
    :class="{'period': period}"
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
        class="timeline-header mt-0"
        v-text="title"
      />
      <h2
        v-else
        class="timeline-header mt-0 mb-2"
        v-text="title"
      />
      <p>
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
      required: true
    }
  }
}
</script>
