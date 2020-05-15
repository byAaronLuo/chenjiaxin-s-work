/*
 * @Description:
 * @Version: 1.0
 * @Autor: AaronLuo
 * @Date: 2020-05-14 20:20:41
 * @LastEditors: AaronLuo
 * @LastEditTime: 2020-05-15 11:52:11
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import getServerData from './assets/js/Post'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$http = getServerData

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
