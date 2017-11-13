import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/MainPage.vue'
import ImprintPage from '@/components/ImprintPage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Lichter.io',
      component: MainPage
    },
    {
      path: '/imprint',
      name: 'Imprint - Lichter.io',
      component: ImprintPage
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
