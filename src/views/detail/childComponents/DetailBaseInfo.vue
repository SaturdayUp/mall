<template>
  <div v-if="Object.keys(goods).length!=0" class="detail-base-info">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.columns[2]}}</span>
    </div>
    <div class="info-service">
      <span class="shop-service-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon" alt="">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props:{
    goods:{
      type:Object,
      default(){
        return {}
      }
    }
  }
}
</script>

<style scoped>
.detail-base-info{
  padding: 0px 8px;
  border-bottom: 5px solid #eeeeee;
}
.info-title{
  margin: 7px 4px;
  font-size: 15px;
}
.info-price{
  margin: 10px 5px;
}
.n-price{
  font-size: 20px;
  color: #FF852A;
  margin: 2px 5px 5px 5px;
}
.o-price{
  font-size: 9px;
  color: #999999;
  text-decoration: line-through;
}
.discount{
  color: #fff;
  background-color: #FF852A;
  font-size: 14px;
  border-radius: 10px;
  padding: 2px 5px;
  margin-left: 5px;
}
.info-other{
  display: flex;
  border-bottom: 1px solid rgba(100,100,100,.1);
  margin-top: 15px;
  line-height: 30px;
}
.info-other span{
  flex: 1;
  text-align: center;
  font-size: 8px;
  color: #999999;
}
.info-service{
  display: flex;
  line-height: 40px;
}
.shop-service-item{
  flex: 1;
  font-size: 13px;
  text-align: center;
}
.shop-service-item img{
  width: 14px;
  height: 14px;
  position: relative;
  top: 2px;
}
</style>