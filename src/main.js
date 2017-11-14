// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueScrollReveal from 'vue-scroll-reveal'
import VueSmoothScroll from 'vue-smooth-scroll'
import VueAnalytics from 'vue-analytics'

Vue.config.productionTip = false

Vue.use(VueAnalytics, {
  id: 'UA-62902757-11',
  router,
  autoTracking: {
    exception: true
  }
})
Vue.use(VueScrollReveal)
Vue.use(VueSmoothScroll)

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
