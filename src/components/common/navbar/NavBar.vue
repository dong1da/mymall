<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
    
  </div>
</template>

<script>
  export default {
    name: 'NavBar'
  }
</script>

<style>
.nav-bar {
  display: flex;
  height: 44px;
  /* 有内容，line-height才会有高度 */
  line-height: 44px;
  text-align: center;
  box-shadow: 0 1px 1px rgb(100, 100, 100, .1);
}
.left, .right {
  width: 60px;
  /* background-color: red; */
}
.center {
  flex: 1;
  /* background-color: blue; */
}
</style>