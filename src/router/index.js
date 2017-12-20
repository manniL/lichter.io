import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '../../pages/index.vue'
import LegalNoticePage from '../../pages/legal.vue'
import NotFoundPage from '../../layouts/error.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'root',
      component: MainPage,
      meta: {
        title: 'Lichter.io - Alexander Lichter'
      }
    },
    {
      path: '/legal',
      name: 'legal',
      component: LegalNoticePage,
      meta: {
        title: 'Legal notice - Lichter.io'
      }
    },
    {
      path: '/404',
      name: '404',
      component: NotFoundPage,
      meta: {
        title: '404 - No Lichter found!'
      }
    },
    {
      path: '*',
      redirect: '/404'
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
