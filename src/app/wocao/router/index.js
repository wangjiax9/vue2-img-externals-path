import Vue from 'vue'
import Router from 'vue-router'

const Hello = () => import(/* webpackChunkName: "hello" */ '../pages/Hello.vue')
const Cao = () => import(/* webpackChunkName: "hello" */ '../pages/Cao.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Hello
    },
    {
      path: '/cao',
      component: Cao
    }
  ]
})
