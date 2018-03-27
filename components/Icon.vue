<template>
  <svg
    :viewBox="viewBox"
    class="w-8 h-8 fill-current inline-block"
    xmlns="http://www.w3.org/2000/svg">
    <path :d="path"/>
  </svg>
</template>

<script>
export default {
  props: {
    viewBox: {
      type: String,
      default: '0 -100 1792 1792'
    },
    path: {
      type: String,
      required: true
    }
  }
}
</script>
