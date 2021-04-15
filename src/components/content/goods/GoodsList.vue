<template>
  <div class="goods-list">
    <good-list-item v-for="goodsItem in goods" :item="goodsItem"/>
  </div>
</template>

<script>
import GoodListItem from "@/components/content/goods/GoodListItem";
export default {
  name: "GoodsList",
  components:{
    GoodListItem
  },
  props:{
    goods:{
      type:Array,
      default(){
        return []
      }
    },
  },

}
</script>

<style scoped>
.goods-list{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>