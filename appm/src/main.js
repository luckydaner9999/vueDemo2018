// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { AlertPlugin, ToastPlugin } from 'vux'
import { Tab, TabItem ,Tabbar, TabbarItem, Search,XInput,Group} from 'vux'

Vue.component('tab', Tab)
Vue.component('tab-item', TabItem)
Vue.component('tabbar', Tabbar)
Vue.component('tabbar-item', TabbarItem)
Vue.component('search', Search)
Vue.component('x-input', XInput)
Vue.component('group', Group)

Vue.config.productionTip = false

Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
const FastClick = require('fastclick')
FastClick.attach(document.body)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
