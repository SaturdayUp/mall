<template>
  <div class="shop-info">
    <div class="shop-top">
      <img :src="shopInfo.logo" alt="">
      <span>{{shopInfo.name}}</span>
    </div>
    <div class="shop-middle">
      <div class="shop-middle-left">
        <div class="info-sells">
          <div class="sells-count">{{shopInfo.sells}}</div>
          <div class="sells-text">总销量</div>
        </div>
        <div class="info-goods">
          <div class="goods-count">{{shopInfo.goodsCount}}</div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      <div class="shop-middle-right">
        <table>
          <tr v-for="(item,index) in shopInfo.score" :key="index">
            <td>{{item.name}}</td>
            <td class="score" :class="{'score-better':item.isBetter}">{{item.score}}</td>
            <td class="better" :class="{'better-more':item.isBetter}"><span>{{item.isBetter?'高':'低'}}</span></td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props:{
    shopInfo:{
      type:Object,
      default(){
        return {}
      }
    }
  }
}
</script>

<style scoped>
.shop-info{
  padding: 25px 8px;
  border-bottom: 5px solid #eee;
}
.shop-top{
  line-height: 45px;
  /*必须设置display：flex，只有设置了flex，align-items才会生效*/
  display: flex;
  align-items: center;
}
.shop-top img{
  width: 45px;
  height: 45px;
  border: 1px solid #eee;
  border-radius: 50%;
}
.shop-top span{
  margin-left: 5px;
}
.shop-middle{
  margin-top: 15px;
  display: flex;
}
.shop-middle-left{
  display: flex;
  align-items: center;
  text-align: center;
  flex: 1;
  border-right: 2px solid #eee;
}
.info-sells,.info-goods{
  flex: 1;
}
.sells-count,.goods-count{
  font-size: 16px;
}
.sells-text{
  font-size: 12px;
  margin-top: 10px;
}
.goods-text{
  font-size: 12px;
  margin-top: 10px;
}
.shop-middle-right{
  /*text-align: right;*/
  flex: 1;
  font-size: 14px;
}
.shop-middle-right table{
  width: 120px;
  margin-left: 20px;
}
.shop-middle-right td{
  padding: 5px 0;
}
.shop-middle-right .score{
  color: #5ea732;
}
.shop-middle-right .score-better{
  color: #f13e3a;
}
.shop-middle-right .better span{
  background-color: #5ea732;
  color: #fff;
  text-align: center;
}
.shop-middle-right .better-more span{
  background-color: #f13e3a;
}
.shop-bottom{
  margin-top: 10px;
  text-align: center;
}
.enter-shop{
  display: inline-block;
  width: 150px;
  height: 30px;
  line-height: 30px;
  background-color: #eee;
  border-radius: 10px;

}
</style>