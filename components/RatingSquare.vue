<template>
  <div class="w-8 h-8 border-4 border-red-darkest shadow-lg mx-1 bg-transparent">
    <div
      class="absolute w-4 h-4 m-1 bg-red-darker shadow-lg"
      :class="{'hidden': hidden}"/>
  </div>
</template>
<script>
export default {
  props: {
    hidden: {
      type: Boolean,
      default: false
    }
  }
}
</script>
