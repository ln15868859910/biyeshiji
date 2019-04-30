// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import '../src/assets/iconfont/iconfont.css'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import * as custom from './common/filter'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(iView)

Object.keys(custom).forEach(key => {
  Vue.filter(key, custom[key])
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
