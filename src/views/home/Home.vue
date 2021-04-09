<template>
  <div class="home">
    <nav-bar class="home-nav">
      <div slot="center">首页</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <home-recommend-view :recommends="recommends"></home-recommend-view>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import HomeSwiper from "@/views/home/childComponents/HomeSwiper";
import HomeRecommendView from "@/views/home/childComponents/HomeRecommendView";

import {getHomeMultidate} from "@/network/home";

export default {
  name: "home",
  components:{
    NavBar,
    HomeSwiper,
    HomeRecommendView
  },
  data(){
    return {
      banners:[],
      recommends:[]
    }
  },
  created() {
    //请求网络数据
    this.getHomeMultidate()
  },

  methods:{
    getHomeMultidate(){
      getHomeMultidate().then(res=>{
        console.log(res);
        this.banners=res.data.banner.list
        this.recommends=res.data.recommend.list
      })
    }
  }

}
</script>

<style scoped>
.home-nav{
  background-color: var(--color-tint);
  color: #fff;
}
</style>