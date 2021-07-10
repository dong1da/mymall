<template>
  <div id="detail">
    <!-- 导航栏 -->
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <!-- <ul>
        <li v-for="(item, index) in $store.state.cartList" :key="index">
          {{item}}
        </li>
      </ul> -->
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-button-bar @addCart="addToCart"></detail-button-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <toast :message="message" :show="show"/>
  </div>
</template>

<script>
import DetailNavBar from "./childCompos/DetailNavBar.vue";
import DetailSwiper from "./childCompos/DetailSwiper.vue";
import DetailBaseInfo from "./childCompos/DetailBaseInfo.vue";
import DetailShopInfo from "./childCompos/DetailShopInfo.vue";
import DetailGoodsInfo from './childCompos/DetailGoodsInfo.vue';
import DetailParamInfo from './childCompos/DetailParamInfo.vue';
import DetailCommentInfo from './childCompos/DetaillCommentInfo.vue'
import DetailButtonBar from './childCompos/DetailButtonBar.vue'

import Scroll from "components/common/scroll/Scroll";
import {debouce} from "common/utils";
import Toast from "components/common/toast/Toast.vue";
import GoodsList from "components/content/goods/GoodsList"
import BackTop from "components/content/backtop/BackTop";

import { getDetail, getRecommend, Goods, Shop, GoodsParam } from "network/detail";

import { mapActions } from 'vuex'

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailButtonBar,
    Scroll,
    GoodsList,
    BackTop,
    Toast
  },
  data() {
    return {
      iid: null,
      topImages: null,
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      isShowBackTop: false,
      message: '',
      show: false
    };
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;

    // 2.根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      // console.log(res);
      // 1.获取顶部图片轮播数据
      const data = res.data.result;
      this.topImages = data.itemInfo.topImages;

      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);

      // 4.获取商品详细信息
      this.detailInfo = data.detailInfo

      // 5.获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      // 6.取出评论信息
      if(data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }

      // this.$nextTick(() => {
        // 根据最新的数据，对应的dom是已经被渲染出来
        // 但是图片没有加载完（目前获取到的offsetTop不包含其中的图片）
        // offsetTopYs值不对的时候，就是因为图片的问题
        // this.themeTopYs = []
        // this.themeTopYs.push(0),
        // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        // console.log(this.themeTopYs);
      // })
    });

    // 3.请求推荐数据
    getRecommend().then(res => {
      // console.log(res);
      this.recommends = res.data.data.list
    })

    // 获取对应的offsetTop
      this.getThemeTopY = debouce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0),
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        // Number.MAX_VALUE表示取Numbuer的最大值
        this.themeTopYs.push(Number.MAX_VALUE);
        // console.log(this.themeTopYs);
    })
  },
  destroyed() {
    console.log('destroyed销毁');
  },
  
  methods: {
    ...mapActions(['addCart']),
    imageLoad() {
      this.$refs.scroll.refresh()
      this.getThemeTopY()
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)
    },
    contentScroll(position) {
      // console.log(position);
      // 1.获取y值
      const positionY = -position.y
      // 2.position和主题中的值进行对比
      // [0, 7344, 8231, 8469]
      // positionY在 0 和 7344之间，index为 0
      // positionY在 7344 和 8231之间，index为 1
      // positionY在8231和8469之间，index为 2
      // positionY > 8469
      let length = this.themeTopYs.length
      for(let i = 0; i < length-1; i++) {
        if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
          // console.log(this.currentIndex);
        }
      }
      // 3.是否显示回到顶部
      this.isShowBackTop = -position.y > 800
    },
    backClick() {
      this.$refs.scroll.scroll.scrollTo(0, 0, 500)
    },
    addToCart() {
      // 1.获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.newPrice;
      product.iid = this.iid
      // 2.将商品添加到购物车中(promise, mapActions)
      // this.$store.cartList.push(product)
      // mutations调用方法
      // this.$store.commit('addCart', product)
      // actions调用方法
      // mapActions
      this.addCart(product).then(res => {
        this.show = true;
        this.message = res;
        setTimeout(() => {
          this.show = false;
          this.message = ''
        }, 1500);
        console.log(res);
      })

      

      // dispatch直接调用promis直接使用then
      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res);
      // })

      // 3.添加到购物车成功
      
    }
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
    position: absolute;
    top: 44px;
    bottom: 58px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
  /* 下面这种写法会导致，点击导航栏跳到对应的位置时，对应的位置会向下多移动44px
  因为这时，是以scroll区域为初始对应位置 */
/* .content {
  height: calc(100% - 44px);
} */
</style>