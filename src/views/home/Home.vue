<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">首页</div>
    </nav-bar>
    <scroll class="content" ref="scroll">
      <home-swiper class="home-swiper" :banners="banners"/>
      <home-recommend-view :recommends="recommends"/>
      <home-feature-view/>
      <tab-control class="tab-control" :titles="['流行','新款','经典']" @tabClick="tabClick"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backTop"></back-top>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import HomeSwiper from "@/views/home/childComponents/HomeSwiper";
import HomeRecommendView from "@/views/home/childComponents/HomeRecommendView";
import HomeFeatureView from "@/views/home/childComponents/HomeFeatureView";
import TabControl from "@/components/common/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import BackTop from "@/components/content/backtop/BackTop";

import {getHomeMultidate,getHomeData} from "@/network/home";
import Scroll from "@/components/common/scroll/Scroll";

export default {
  name: "home",
  components:{
    Scroll,
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    HomeFeatureView,
    TabControl,
    GoodsList,
    BackTop
  },
  data(){
    return {
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]}
      },
      currentType:'pop'
    }
  },
  created() {
    //请求网络数据
    //1.请求轮播图和推荐的相关数据
    this.getHomeMultidate()
    //2.请求goodsList相关数据
    //  2.1 请求流行相关数据
    this.getHomeData('pop')
    //  2.2请求新款相关数据
    this.getHomeData('new')
    //  2.3请求经典相关数据
    this.getHomeData('sell')
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  methods:{
    //普通点击事件的方法
    tabClick(index){
    //  根据点击的不同的tabControl来请求不同的数据
      switch (index){
        case 0:
          this.currentType='pop'
          break
        case 1:
          this.currentType='new'
          break
        case 2:
          this.currentType='sell'
          break
      }
    },
    //回到顶部组件的点击事件
    backTop(){
      //通过ref找到scroll组件标签，然后在scroll组件中通过scroll找到scroll中的scrollTo方法
      this.$refs.scroll.scrollTo(0,0,200)
    },
    getHomeMultidate(){
      getHomeMultidate().then(res=>{
        // console.log(res);
        this.banners=res.data.banner.list
        this.recommends=res.data.recommend.list
      })
    },
    getHomeData(type){
      // console.log(type);
      // this.currentType=type
      // console.log(this.currentType);
      this.page=this.goods[type].page+1
      getHomeData(type,this.page).then(res=>{
        // console.log(res.data.list);
        // console.log(res);
        this.goods[type].list.push(...res.data.list)
        this.page+=1
      }).catch(err=>{
        console.log(err);
      })
    }
  }
}
</script>

<style scoped>
#home{
  /*padding-top: 44px;*/
  height: 100vh;
  margin-bottom: 49px;
}
.home-nav{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
  background-color: #FF852A;
  color: #fff;
}
.content{
  height: calc(100% - 44px - 49px);
  overflow: hidden;
  margin-top: 44px;
}
.home-swiper{

}
.tab-control{
  position: sticky;
  top: 44px;
  z-index: 9;
}
</style>