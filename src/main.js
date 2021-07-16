import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import VueLazyload from 'vue-lazyload'

// 添加事件总线对象
Vue.prototype.$bus = new Vue()

// 解决移动端300ms延迟
FastClick.attach(document.body)

// 使用懒加载的插件
const loadimage = require('./assets/img/common/placeholder.png') 

Vue.use(VueLazyload, {
  loading: loadimage
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')