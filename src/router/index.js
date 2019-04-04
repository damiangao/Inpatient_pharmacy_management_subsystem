import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import TestPage1 from '@/components/TestPage1'
import TestPage2 from '@/components/TestPage2'
import OutStock from '@/components/OutStock'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/test1',
      name: 'TestPage1',
      component: TestPage1
    },
    {
      path: '/test2',
      name: 'TestPage2',
      component: TestPage2
    },
    {
      path: '/outStock',
      name: 'OutStock',
      component: OutStock
    }
  ]
})
