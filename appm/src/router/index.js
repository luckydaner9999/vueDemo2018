import Vue from 'vue'
import Router from 'vue-router'
import tab from '@/components/tab.vue'
import moveList from '@/views/moveList.vue'
import ranking from '@/views/ranking.vue'
import my from '@/views/my.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'tab',
        component: tab,
        children:[
          {
            path: 'moveList',
            name: 'moveList',
            component: moveList
          },
          {
            path: 'ranking',
            name: 'ranking',
            component: ranking
          },
          {
            path: 'my',
            name: 'my',
            component: my
          },
        ]
      },
      
    ]
  })
