<template>
  <!-- ref如果是绑定在组件中，那么通过this.$refs.refname获取到的是一个组件对象 -->
  <!-- ref如果是绑定在普通的元素中，那么通过this.$refs.refname获取到的是一个元素对象 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    // 如果很多地方都叫wrapper时，不确定拿到的是那个wrapper，所以可以通过ref来获取
    // 1.创建BetterScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      // better-scroll2.0以上版本必须设置，否则无法滚动
      observeDOM: true,
      // observeImage里面的属性包含高度的refresh，还有防抖功能
      observeImage: true,
      // 打开滚动区域的点击事件
      click: true,
      pullUpLoad: this.pullUpLoad,
      
    });

    // 2.监听滚动的区域
    // 如果想要其他界面的滚动区域是否需要监听，则需要看其界面的滚动区域是否实时传入了一个滚动的值例：probeType: this.probeType
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", (position) => {
        // console.log(position);
        this.$emit("scroll", position);
      });
    }
    console.log(this.scroll);
    // 3.监听scroll滚到底部
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        // console.log('监听滚动到底部');
        this.$emit('pullingUp')
      })
    }
  },
  methods: {
    scrollTo(x, y, time = 500) {
      this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    refresh() {
      console.log('高度重新计算');
      this.scroll.refresh()
    }
  },
};
</script>

<style scoped>
</style>