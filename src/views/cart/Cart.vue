<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <scroll class="content" ref="scroll">
      <cart-list></cart-list>
      
    </scroll>
    <!-- 底部汇总 -->
    <cart-button-bar></cart-button-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import CartList from "./childComps/CartList.vue";
import CartButtonBar from './childComps/CartButtonBar.vue'

import { mapGetters } from "vuex";
export default {
  name: "Cart",
  components: {
    NavBar,
    Scroll,
    CartList,
    CartButtonBar
  },
  computed: {
    ...mapGetters({
      length: "cartLength",
    }),
  },
  activated() {
    this.$refs.scroll.refresh()
  }
};
</script>

<style scoped>

.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}

.content {
  position: absolute;
  top: 44px;
  bottom: 58px;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>