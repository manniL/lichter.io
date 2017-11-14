import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/MainPage.vue'
import ImprintPage from '@/components/ImprintPage.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Lichter.io',
      component: MainPage,
      meta: {
        title: 'Lichter.io'
      }
    },
    {
      path: '/imprint',
      name: 'Imprint - Lichter.io',
      component: ImprintPage,
      meta: {
        title: 'Imprint - Lichter.io'
      }
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
})
