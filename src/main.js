// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueResource from 'vue-resource'
// import Vuex from 'vuex';
import VueSocketio from 'vue-socket.io'



Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueResource);

// Vue.use(Vuex)
// 注册
Vue.use(VueSocketio, 'http://localhost:3000')


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // render: h => h(App),
  template: '<App/>',
  components: { App }
})
