<template>
    <li class="timeline-item" :class="{'period': period}" v-scroll-reveal>
        <div class="timeline-info" v-if="!period">
            <span>{{when}}</span>
        </div>
        <div class="timeline-marker" v-if="!period"></div>
        <div class="timeline-content">
            <h3 class="timeline-header" v-if="!period">{{title}}</h3>
            <h2 class="timeline-header mb-2" v-else>{{title}}</h2>
            <p>
                <slot></slot>
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