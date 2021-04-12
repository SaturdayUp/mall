<template>
  <div class="goods-list-item">
    <img :src="showImage" alt="" @load="imgLoad" @click="clickItem">
      <div class="goods-info">
        <p>{{item.title}}</p>
        ￥<span class="price">{{item.price}}</span>
        <span class="collect">{{item.cfav}}</span>
      </div>
  </div>
</template>

<script>
export default {
  name: "GoodListItem",
  props:{
    item:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  computed:{
    showImage(){
      return this.item.image||this.item.show.img
    }
  },
  methods:{
    //每张图片加载完毕之后调用一次imgLoad，重新计算高度
    imgLoad(){
      //加载完一张图片就向home发送一次图片加载完成的事件,因为向home发送事件并不是简单的父子组件之间的通信
      //所以这里我们使用事件总线eventbus进行发送，否则GoodListItem还要向GoodsList发送事件，然后GoodsList再向home发送事件
      //这样十分麻烦
      this.$bus.$emit('itemImgLoad')
    },
    //点击商品，跳转到详情页
    clickItem(){
      //点击商品，跳转到详情页，并将对应的商品id传递过去
      this.$router.push('/detail/'+this.item.iid)
    }
  }
}
</script>

<style scoped>
.goods-list-item{
  width: 46%;
  position: relative;
}
.goods-list-item img{
  width: 100%;
  border-radius: 10px;
}
.goods-info{
  font-size: 12px;
  text-align: center;
  margin-bottom: 2px;
}
.goods-info p{
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.goods-info .price{
  margin-right: 18px;
  font-size: 16px;
  color: #FF852A;
}
.goods-info .collect{
  position: relative;
}
.goods-info .collect::before {
  content: '';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>