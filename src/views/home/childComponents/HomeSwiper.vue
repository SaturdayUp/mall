<template>
  <swiper>
    <swiper-item v-for="item in banners" @load="swiperImageLoad">
      <a :href="item.link">
        <img :src="item.image" alt="">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from '@/components/common/swipper/index'
export default {
  name: "HomeSwiper",
  props:{
    banners:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return{
      isLoad:false
    }
  },
  components:{
    Swiper,
    SwiperItem
  },
  methods:{
    swiperImageLoad(){
      if (!this.isLoad){
        //当轮播图加载完毕之后向home发送一个事件，这样做防止高度计算不对
        this.$emit('swiperImageLoad')
        this.isLoad=true
      }

    }
  }
}
</script>

<style scoped>

</style>