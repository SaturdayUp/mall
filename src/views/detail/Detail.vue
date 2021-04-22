<template>
  <div id="detail">
    <detail-nav-bar @clickTitle="clickTitle" ref="detailNavBar"/>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop-info="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"/>
      <detail-params-info ref="params" :param-info="paramInfo"/>
      <detail-common-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop"/>
    <detail-bottom-bar class="detail-bottom-bar" @addToCart="addCart"/>
  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/childComponents/DetailNavBar";
import {getDetails,Goods,Shop,GoodsParmas,getRecommend} from "@/network/detail";
import DetailSwiper from "@/views/detail/childComponents/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComponents/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComponents/DetailShopInfo";
import DetailGoodsInfo from "@/views/detail/childComponents/DetailGoodsInfo";
import DetailParamsInfo from "@/views/detail/childComponents/DetailParamsInfo";
import DetailCommonInfo from "@/views/detail/childComponents/DetailCommentInfo";
import DetailBottomBar from "@/views/detail/childComponents/DetailBottomBar";
import GoodsList from "@/components/content/goods/GoodsList";
import BackTop from "@/components/content/backtop/BackTop";
import Scroll from "@/components/common/scroll/Scroll";
import {debounce} from "@/common/Utils";

export default {
  name: "Detail",
  data(){
    return{
      iid:null,
      topImages:[],
      goods: {},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      refresh:null,
      itemImgListener:null,
      themeTopYs:[],
      getThemeTopY:null,
      currentIndex:0,
      isShowBackTop:false
    }
  },
  components:{
    Scroll,
    DetailBaseInfo,
    DetailSwiper,
    DetailNavBar,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommonInfo,
    DetailBottomBar,
    GoodsList,
    BackTop
  },
  created() {
    //获取到路由中的id
    this.iid=this.$route.params.iid
    //获取详情中的数据
    getDetails(this.iid).then(res=>{
      // console.log(res);
      const data=res.result
      //1.1获取轮播图数据
      this.topImages=data.itemInfo.topImages
      //1.2获取商品信息
      this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      //1.3获取商家信息
      this.shop=new Shop(data.shopInfo)
      //1.4获取详细商品信息
      this.detailInfo=data.detailInfo
      //1.5获取商品尺寸信息
      this.paramInfo=new GoodsParmas(data.itemParams.info,data.itemParams.rule)
      //1.6获取评论相关信息
      if (data.rate.list){
        this.commentInfo=data.rate.list[0]
        // console.log(this.commentInfo);
      }
    }).catch(err=>{
      console.log(err);
    })

    getRecommend().then(res=>{
      this.recommends=res.data.list
    }).catch(err=>{
      console.log(err);
    })

  },
  mounted() {
    //初始化getThemeTopY函数，计算offsetTop，将其放到数组themeTopY中
    this.getThemeTopY=debounce(()=>{
      this.themeTopYs=[]
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      //为了使下面判断时不会出现数组下标越界的问题，这里我们往数组中再添加一个元素，并将其设置为无穷大
      this.themeTopYs.push(Number.MAX_VALUE)
      console.log(this.themeTopYs);
    },300)
    //这里应该也进行一次debounce操作
    this.refresh=debounce(this.$refs.scroll.refresh,500)
    this.itemImgListener=()=>{
      this.refresh()
    }
    //为了防止detail组件中图片加载不完全，导致不能滑动的情况，我们应该也要监听一下图片加载完成
    this.$bus.$on('itemImageLoad',this.itemImgListener)
  },
  destroyed() {
    //因为detail这个组件没有keep-alive，所以不能使用actived和deactived，所以为了取消监听图片加载完成的事件，要在destory中进行操作
    this.$bus.$off('itemImageLoad',this.itemImgListener)
  },
  methods:{
    imgLoad(){
      //所有的图片都加载完毕了，此时进行刷新
      this.refresh()
      //此时调用getThemeTopY
      this.getThemeTopY()
    },
    clickTitle(index){
      // console.log(index);
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],300)
    },
    contentScroll(position){
      //判断当前滚动的高度，绝定backTop是否显示
      this.isShowBackTop=-position.y>1000?true:false
      const positionY=-position.y
      let length=this.themeTopYs.length
      for (let i = 0; i < length-1; i++) {
        if ((this.currentIndex!==i)&&((positionY>=this.themeTopYs[i])&&(positionY<this.themeTopYs[i+1]))){
          this.currentIndex=i
          //让detailNavBar中的currentIndex等于现在的index
          this.$refs.detailNavBar.currentIndex=this.currentIndex
        }
      }
    },
    backTop(){
      this.$refs.scroll.scrollTo(0,0,300)
    },
    //加入购物车
    addCart(){
      //点击加入购物车按钮，将购物车所展示的商品信息发送过去，这里最好使用vuex来管理购物车的状态
      // console.log('加入购物车成功');
      //获取购物车中需要展示的商品信息
      const product={}
      product.image=this.topImages[0]
      product.title=this.goods.title
      product.desc=this.goods.desc
      product.price=this.goods.realPrice
      product.iid=this.iid
      //利用vuex来对状态进行管理
      //dispatch会返回一个promise，当加入购物车成功后在actions的addCart方法中返回一个promise，然后传入resolve和reject
      //在resolve中传入添加购物车成功后的提示
      this.$store.dispatch('addCart',product).then(res=>{
        // console.log(res);
        this.$toast.show(res,2000)
      })
    }
  }
}
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 10;
  height: 100vh;
  background-color: #fff;
}
.content{
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>