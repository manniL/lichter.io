import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '../pages/MainPage.vue'
import LegalNoticePage from '../pages/LegalNoticePage.vue'
import NotFoundPage from '../pages/NotFoundPage.vue'

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
      path: '/legal',
      name: 'Legal notice - Lichter.io',
      component: LegalNoticePage,
      meta: {
        title: 'Legal notice - Lichter.io'
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
