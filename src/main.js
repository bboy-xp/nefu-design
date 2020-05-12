import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios"
import './plugins/element.js'


Vue.config.productionTip = false
// 挂载到原型上全局访问
Vue.prototype.$axios = axios

axios.defaults.baseURL = '/api' // 请求路径前缀
axios.defaults.headers.post['Content-Type'] = 'application/json' // 实体数据的数据类型

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
