import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'
// 1.安装插件
Vue.use(Vuex)

// 2.创建store对象
const state = {
  cartList: []
}
const store = new Vuex.Store({
  // 保存状态
  state,
  // 状态更新，修改操作
  mutations,
  actions,
  getters
})

// 3.挂载到vue实例上
export default store