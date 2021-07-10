<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll" class="checked-button" @click.native="checkClcik"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计： {{totalPrice}}
    </div>

    <div class="calculate">
      结算：{{checkLength}}
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton.vue";
import { mapGetters } from 'vuex';
export default {
  name: "CartButtonBar",
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return '￥' + this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0)
    },
    checkLength() {
      return this.$store.state.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      // 方法一：find方法
      if (this.cartList.length === 0) return false
      return !this.cartList.find(item => !item.checked)
      // 方法二：遍历
      // for (let item of this.cartList) {
      //   if(!item.checked) {
      //     return false
      //   }
      // }
      // return true
    }
  },
  methods: {
    checkClcik() {
      if (this.isSelectAll) { // 全部选中
        this.cartList.forEach(item => item.checked = false)
      } else { //全部不选择
        this.cartList.forEach(item => item.checked = true)
      }
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  width: 100%;
  height: 40px;
  background-color: #eee;
  position: fixed;
  left: 0px;
  bottom: 49px;
  line-height: 40px;
  display: flex;
  justify-content: space-between;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 5px;
}
.checked-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.price {
  margin-left: 30px;
}
.calculate {
  width: 90px;
  background: red;
  color: #fff;
  text-align: center;
  border-radius: 5px;
  margin-right: 5px ;
}
</style>