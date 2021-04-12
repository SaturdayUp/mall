<template>
  <div class="detail">
    <detail-nav-bar/>
    <detail-swiper :top-images="topImages"/>
    <detail-base-info :goods="goods"/>
  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/childComponents/DetailNavBar";
import {getDetails,Goods} from "@/network/detail";
import DetailSwiper from "@/views/detail/childComponents/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComponents/DetailBaseInfo";

export default {
  name: "Detail",
  data(){
    return{
      iid:null,
      topImages:[],
      goods: {}
    }
  },
  components:{
    DetailBaseInfo,
    DetailSwiper,
    DetailNavBar
  },
  created() {
    //获取到路由中的id
    this.iid=this.$route.params.iid
    //获取详情中的数据
    getDetails(this.iid).then(res=>{
      console.log(res);
      const data=res.result
      //1.1获取轮播图数据
      this.topImages=data.itemInfo.topImages
      //1.2获取商品信息
      this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)

    }).catch(err=>{
      console.log(err);
    })
  }
}
</script>

<style scoped>

</style>