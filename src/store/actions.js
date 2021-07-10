import { ADD_COUNTER, ADD_TO_CART } from "./mutations-types";

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // 1.查找之前的数组中是否有该商品
      let oldProduct = context.state.cartList.find(
        item => item.iid === payload.iid
      );
      // 2.判断oldProduct
      if (oldProduct) { //数量加1
        // oldProduct.count += 1
        context.commit(ADD_COUNTER, oldProduct);
        resolve('当前的商品数量+1')
      } else {
        // 给payload添加一个属性：obj.name = ""
        payload.count = 1;
        // count.state.cartList.push(payload)
        context.commit(ADD_TO_CART, payload);
        resolve('添加了新的商品')
      }
    });
  }
};
