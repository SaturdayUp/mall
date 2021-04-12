<template>
  <div class="goods-list-item">
    <img :src="showImage" alt="">
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