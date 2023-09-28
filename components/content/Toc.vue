<script setup lang="ts">
const { toc } = useContent()
</script>

<template>
  <div>
    <template v-if="toc?.links?.length">
      <h2 id="toc"><a href="#toc">Table of Contents</a></h2>
      <TocLinks :links="toc.links" />
    </template>
  </div>
</template>