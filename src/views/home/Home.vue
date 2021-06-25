<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
        :titles="['流行', '新款', '精选']"
        class="tab-control"
        @tabClick="tabClick"
        ref="tabControl"
        v-show="isTabFixed"
      ></tab-control>
    <!-- 滚动区域实时监听，将probe-type里面的值传入子组件scroll里面 -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature></feature>
      <tab-control
        :titles="['流行', '新款', '精选']"
        class="tab-control"
        @tabClick="tabClick"
        ref="tabControl"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!-- .native 监听组件元素的原生事件 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
// 公共组件
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backtop/BackTop";

// home层组件
import HomeSwiper from "./childcomps/HomeSwiper";
import RecommendView from "./childcomps/RecommendView";
import Feature from "./childcomps/Feature.vue";

// 在home.js中导出时没有使用default导出所以需要大括号{}引入
import { getHomeMultidata } from "network/home";
import { getHomeGoods } from "network/home";

// 引入三方插件 为了以后方便维护，封装组件
import BetterScroll from "better-scroll";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    Feature,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    //1.请求多个数据
    this.getHomeMultidata();

    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");

    // 在created里面拿到this.$refs.scroll有可能是空的
    
  },
  mounted() {
    // 1.监听item中图片加载完成
    const refresh = this.debounce(this.$refs.scroll.refresh, 500)
    this.$bus.$on('itemImageLoad', () => {
      // this.$refs.scroll.refresh()
      refresh()
      // console.log('.....');
    })
  },
  destroyed() {
    console.log('home_destroyed');
  },
  methods: {
    /* 事件监听相关的方法 */
    // 实现点击切换流行，新款，精选的视图功能
    // 防抖函数
    debounce(func, delay) {
      let timer = null
      return function (...args) {
        if(timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(() => {
          func.apply(this, args)
        }, delay)
      }
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    // 实现返回顶部功能
    backClick() {
      this.$refs.scroll.scroll.scrollTo(0, 0, 500);
      // this.$refs.scroll.scrollTo()
    },
    // 实现返回顶部按钮的隐藏和显示，需要监听当前滚动位置
    contentScroll(position) {
      // console.log(position);
      // 1.判断backtop是否显示
      this.isShowBackTop = -position.y > 1000;

      // 2.决定tabControl是否吸顶(position: fixed)
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    // 实现上拉加载更多功能
    loadMore() {
      // console.log('加载更多');
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad() {
      // 获取tabControl的offsetTop
      // 所有组件中都有一个属性$el: 用于获取组件中的元素
      // console.log(this.$refs.tabControl.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
    },

    /* 网路请求相关的方法 */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        // this.result = res;
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res)
        this.goods[type].list.push(...res.data.data.list);
        this.goods[type].page += 1;

        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

// 加scoped表示style样式只对当前作用域起作用
<style scoped>
#home {
  /* padding-top: 44px; */
  /* vh: 视口高度 */
  height: 100vh;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}

.tab-control {
  /* 粘性定位 */
  position: sticky;
  /* 离顶部44px位置时固定不动 */
  top: 0px;
  z-index: 9;
}

.content {
  /* height: 300px; */
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}


/* .content {
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
} */
</style>