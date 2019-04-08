import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import TestPage1 from '@/components/TestPage1'
import TestPage2 from '@/components/TestPage2'
import OutStock from '@/components/OutStock'
import Login from '@/components/Login'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login',
      hidden: true
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {requireAuth: true}, // 必须要登录才能跳转
      children: [
        {
          path: '/helloWorld',
          name: 'HelloWorld',
          component: HelloWorld,
          meta: {requireAuth: true}
        },
        {
          path: '/test1',
          name: 'TestPage1',
          component: TestPage1,
          meta: {requireAuth: true}
        },
        {
          path: '/test2',
          name: 'TestPage2',
          component: TestPage2,
          meta: {requireAuth: true}
        },
        {
          path: '/outStock',
          name: 'OutStock',
          component: OutStock
        }
      ]
    }
  ]
})
