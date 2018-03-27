<template>
  <svg
    :viewBox="viewBox"
    :class="iconClass"
    xmlns="http://www.w3.org/2000/svg">
    <path :d="path"/>
    <title
      v-if="iconTitle"
      v-text="iconTitle"/>
  </svg>
</template>

<script>
export default {
  props: {
    path: {
      type: String,
      required: true
    },
    viewBox: {
      type: String,
      default: '0 -100 1792 1792'
    },
    iconClass: {
      type: String,
      default: 'w-8 h-8 fill-current inline-block'
    },
    iconTitle: {
      type: String,
      default: ''
    }
  }
}
</script>
