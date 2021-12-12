import Vue from 'vue'
import Router from 'vue-router'
import Pictures from '../views/Pictures.vue'
import Index from '../views/Index.vue'
import Info from '../views/Info.vue'
import Internt from '../views/Internt'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '',
      name: 'index',
      component: Index,
    },
    {
      path: '/pictures',
      name: 'pictures',
      component: Pictures,
    },
    {
      path: '/info',
      name: 'info',
      component: Info,
    },
    {
      path: '/internt',
      name: 'internt',
      component: Internt,
    },
  ],
})
