import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Index from '../components/Index'
import Dialog from '../components/Dialog'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      component: Login,
      name: 'Login',
      hidden: true
    },
    {
      path: '/index',
      component: Index,
      name: 'Index'
    },
    {
      path: '/dialog',
      component: Dialog,
      name: 'Dialog'
    }
  ]
})
