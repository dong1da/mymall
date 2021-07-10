import {ADD_COUNTER, ADD_TO_CART } from './mutations-types'

export default {
  // mutation唯一目的是修改state中状态
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = false
    state.cartList.push(payload)
  }
}