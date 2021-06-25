<template>
<div class="wrapper">
  <ul class="content">
    <button @click="btnClick">点击</button>
    <li>better-scroll滚动1</li>
    <li>better-scroll滚动2</li>
    <li>better-scroll滚动3</li>
    <li>better-scroll滚动4</li>
    <li>better-scroll滚动5</li>
    <li>better-scroll滚动6</li>
    <li>better-scroll滚动7</li>
    <li>better-scroll滚动8</li>
    <li>better-scroll滚动9</li>
    <li>better-scroll滚动10</li>
    <li>better-scroll滚动11</li>
    <li>better-scroll滚动12</li>
    <li>better-scroll滚动13</li>
    <li>better-scroll滚动14</li>
    <li>better-scroll滚动15</li>
    <li>better-scroll滚动16</li>
    <li>better-scroll滚动17</li>
    <li>better-scroll滚动18</li>
    <li>better-scroll滚动19</li>
    <li>better-scroll滚动20</li>
    <li>better-scroll滚动21</li>
    <li>better-scroll滚动22</li>
    <li>better-scroll滚动23</li>
    <li>better-scroll滚动24</li>
    <li>better-scroll滚动25</li>
    <li>better-scroll滚动26</li>
    <li>better-scroll滚动27</li>
    <li>better-scroll滚动28</li>
    <li>better-scroll滚动29</li>
    <li>better-scroll滚动30</li>
    <li>better-scroll滚动31</li>
    <li>better-scroll滚动32</li>
    <li>better-scroll滚动33</li>
    <li>better-scroll滚动34</li>
    <li>better-scroll滚动35</li>
    <li>better-scroll滚动36</li>
    <li>better-scroll滚动37</li>
    <li>better-scroll滚动38</li>
    <li>better-scroll滚动39</li>
    <li>better-scroll滚动40</li>
    <li>better-scroll滚动41</li>
    <li>better-scroll滚动42</li>
    <li>better-scroll滚动43</li>
    <li>better-scroll滚动44</li>
    <li>better-scroll滚动45</li>
    <li>better-scroll滚动46</li>
    <li>better-scroll滚动47</li>
    <li>better-scroll滚动48</li>
    <li>better-scroll滚动49</li>
    <li>better-scroll滚动50</li>
    <li>better-scroll滚动51</li>
    <li>better-scroll滚动52</li>
    <li>better-scroll滚动53</li>
    <li>better-scroll滚动54</li>
    <li>better-scroll滚动55</li>
    <li>better-scroll滚动56</li>
    <li>better-scroll滚动57</li>
    <li>better-scroll滚动58</li>
    <li>better-scroll滚动59</li>
    <li>better-scroll滚动60</li>
    <li>better-scroll滚动61</li>
    <li>better-scroll滚动62</li>
    <li>better-scroll滚动63</li>
    <li>better-scroll滚动64</li>
    <li>better-scroll滚动65</li>
    <li>better-scroll滚动66</li>
    <li>better-scroll滚动67</li>
    <li>better-scroll滚动68</li>
    <li>better-scroll滚动69</li>
    <li>better-scroll滚动70</li>
    <li>better-scroll滚动71</li>
    <li>better-scroll滚动72</li>
    <li>better-scroll滚动73</li>
    <li>better-scroll滚动74</li>
    <li>better-scroll滚动75</li>
    <li>better-scroll滚动76</li>
    <li>better-scroll滚动77</li>
    <li>better-scroll滚动78</li>
    <li>better-scroll滚动79</li>
    <li>better-scroll滚动80</li>
    <li>better-scroll滚动81</li>
    <li>better-scroll滚动82</li>
    <li>better-scroll滚动83</li>
    <li>better-scroll滚动84</li>
    <li>better-scroll滚动85</li>
    <li>better-scroll滚动86</li>
    <li>better-scroll滚动87</li>
    <li>better-scroll滚动88</li>
    <li>better-scroll滚动89</li>
    <li>better-scroll滚动90</li>
    <li>better-scroll滚动91</li>
    <li>better-scroll滚动92</li>
    <li>better-scroll滚动93</li>
    <li>better-scroll滚动94</li>
    <li>better-scroll滚动95</li>
    <li>better-scroll滚动96</li>
    <li>better-scroll滚动97</li>
    <li>better-scroll滚动98</li>
    <li>better-scroll滚动99</li>
    <li>better-scroll滚动100</li>
  </ul>
</div>
  
</template>

<script>
  import BetterScroll from 'better-scroll'
  
  export default {
    name: "Category",
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      this.scroll = new BetterScroll(document.querySelector('.wrapper'), {
        probeType: 3,
        pullUpLoad: true,
        click: true
      })

      this.scroll.on('scroll', (position) => {
        // console.log(position);
      })

      this.scroll.on('pullingUp', () => {
        console.log('加载更多');
      })
    },
    methods: {
      btnClick() {
        console.log('btnclick');
      }
    }
    
  };
</script>

<style scoped>
/* 方法一：原生滚动 */
/* .content { */
  /* 设置局部滚动 */
  /* height: 150px; */
  /* background-color: red; */
  /* overflow: hidden; */
  /* 在y轴上可以实现滚动 */
  /* overflow-y: scroll; */
/* } */
/* 方法二： 使用better-scroll方法 */
.wrapper {
  height: 150px;
  background-color: red;
  overflow: hidden;
}
</style>