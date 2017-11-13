// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueScrollReveal from 'vue-scroll-reveal'
import VueSmoothScroll from 'vue-smooth-scroll'
Vue.config.productionTip = false

Vue.use(VueScrollReveal)
Vue.use(VueSmoothScroll)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
