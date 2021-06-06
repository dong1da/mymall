<template>
  <!-- 所有的tab-bar-item都展示相同的图片文字 -->
  <div class="tab-bar-item" @click="itemClick">
    <!-- 给插槽包装一层div，可以保证在替换时不会替换插槽原来的一些属性 -->
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <!-- <slot v-if="!isActive" name="item-icon"></slot> -->
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  data() {
    return {
      // isActive: true,
    };
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle() {
      return  this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemClick() {
      this.$router.push(this.path).catch((error) => error) 
    },
  },
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  /* 去掉图片下方多出的像素 */
  vertical-align: middle;
  margin-top: 2px;
  
}

</style>