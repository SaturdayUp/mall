<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">首页</div>
    </nav-bar>
    <tab-control
        v-show="isTabFixed"
        class="tab-control"
        :titles="['流行','新款','经典']"
        ref="tabControl1"
        @tabClick="tabClick"
        ></tab-control>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @scroll="scrollContent"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <home-recommend-view :recommends="recommends"/>
      <home-feature-view/>
      <tab-control
          :titles="['流行','新款','经典']"
          @tabClick="tabClick"
          ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
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
import {debounce} from "@/common/Utils";
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
      currentType:'pop',
      isShowBackTop:false,
      itemImgListener:null,
      refresh:null,
      isTabFixed:false,
      tabOffsetTop:0,
      saveY:0,
      tabY:0
    }
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
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
   mounted() {
   // 为了避免每张图片加载完都发送事件并刷新界面，我们这里使用防抖函数来避免
     this.refresh=debounce(this.$refs.scroll.refresh,300)
   // 在界面渲染时监听GoodListItem发送过来的图片加载完成的事件，然后进行refresh界面，重新计算高度
     this.itemImgListener=()=>{
       this.refresh()
     }
     //需要传入两个参数，一个参数是GoodListItem发来的事件名，第二个参数是一个回调函数，每次收到发来的事件都去调用这个回调函数，refresh界面
     this.$bus.$on('itemImgLoad',this.itemImgListener)
   },
  //当首页组件处于活跃状态
  activated() {
    //当处于活跃状态时，跳转到以前的位置
    this.$refs.scroll.scroll.scrollTo(0,this.saveY,10)
    //回到组件时最好refresh一下
    this.$refs.scroll.refresh()
  },
  //当首页组件处于不活跃状态
  deactivated() {
    //当离开时，保存此时的位置
    this.saveY=this.$refs.scroll.scroll.y
  },
  methods:{
    /**
     * 普通点击事件的方法
     * */
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
      this.$refs.tabControl1.currentIndex=index
      this.$refs.tabControl2.currentIndex=index
    },
    //回到顶部组件的点击事件
    backTop(){
      //通过ref找到scroll组件标签，然后在scroll组件中通过scroll找到scroll中的scrollTo方法
      this.$refs.scroll.scrollTo(0,0,200)
    },
    //scroll.vue发过来了一个用于监听滚动的事件，在首页的scroll标签中进行注册
    scrollContent(position){
      //判断当前滚动的位置是否大于1000，如果大于将isShowBackTop设置为true
      //注意在监听滚动的时候一定要将probeType传过来，因为在scroll组件中默认的probeType是0，不会监听滚动，必须设置为2或3才会监听滚动
      this.isShowBackTop=(-position.y)>700?true:false
      this.swiperImageLoad()
      this.isTabFixed=(-position.y)>this.tabOffsetTop?true:false
    },
    loadMore(){
      //调用getHomeData方法，把当前的currentType作为参数
      this.getHomeData(this.currentType)
    },
    swiperImageLoad() {
      this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop
    },
    /**
     * 数据请求相关方法
     * */
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
        this.goods[type].page+=1
        //默认情况下只会有一次上拉加载更多，我们需要每次加载更多之后，将上次的上拉加载更多finish掉
        this.$refs.scroll.finishPullUp()
      }).catch(err=>{
        console.log(err);
      })
    },
  }
}
</script>

<style scoped>
#home{
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
  /*margin-bottom: 49px;*/
}
.home-nav{
  /*使用了better-scroll后，因为home-nav没有包裹在scroll中，所以他是不会随着滚动的*/
  /*position: fixed;*/
  /*top: 0;*/
  /*left: 0;*/
  /*right: 0;*/
  /*z-index: 9;*/
  background-color: #FF852A;
  color: #fff;
}
.content{
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control{
  position: relative;
  z-index: 9;
}
</style>