import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/views/login'

Vue.use(Router)

export default new Router({
  //去掉默认的#号
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      redirect:{
        name:'login'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
  ]
})
