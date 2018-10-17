import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Registor from '../views/registor'
import FormItem from '../views/components/formitem.vue'
import FormPreview from '../views/components/formpreview.vue'
import dynamicTable from '../views/components/dynamicTable.vue'
import Anchor from '../views/components/anchor.vue'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/web/registor',
      name: 'registor',
      component: Registor
    },
    {
      path: '/form',
      name: 'form',
      component: FormItem
    },
    {
      path: '/formPre',
      name: 'formPre',
      component: FormPreview
    },
    {
      path: '/dynamicTable',
      name: 'dynamicTable',
      component: dynamicTable
    },
    {
      path: '/anchor',
      name: 'anchor',
      component: Anchor
    },
  ]
})
