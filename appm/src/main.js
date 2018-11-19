// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {
  AlertPlugin,
  ToastPlugin
} from 'vux'
import VueI18n from 'vue-i18n';
import {
  Tab,
  TabItem,
  Tabbar,
  TabbarItem,
  Search,
  XInput,
  Group,
  XHeader,
  Icon,
  Panel,
  XButton,
  Radio,Grid,GridItem,
  Flexbox,
  FlexboxItem
} from 'vux'

Vue.component('tab', Tab)
Vue.component('tab-item', TabItem)
Vue.component('tabbar', Tabbar)
Vue.component('tabbar-item', TabbarItem)
Vue.component('search', Search)
Vue.component('x-input', XInput)
Vue.component('group', Group)
Vue.component('x-header', XHeader)
Vue.component('icon', Icon)
Vue.component('panel', Panel)
Vue.component('x-button', XButton)
Vue.component('radio', Radio)
Vue.component('grid', Grid)
Vue.component('grid-item', GridItem)
Vue.component('flexbox', Flexbox)
Vue.component('flexbox-item', FlexboxItem)

Vue.config.productionTip = false

Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'zh-CN', //语言标识
  messages: {
    'zh-CN': require('./common/lang/zh'),
    'en-US': require('./common/lang/en')
  }
})
const FastClick = require('fastclick')
FastClick.attach(document.body)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: {
    App
  },
  template: '<App/>'
})
