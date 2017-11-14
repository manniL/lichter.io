import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/MainPage.vue'
import ImprintPage from '@/components/ImprintPage.vue'
import NotFoundPage from '@/components/NotFoundPage.vue'

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
    },
    {
      path: '*',
      name: '404 - No Lichter found!',
      component: NotFoundPage,
      meta: {
        title: '404 - No Lichter found!'
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
