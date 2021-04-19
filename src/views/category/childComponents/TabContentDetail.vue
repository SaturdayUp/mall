<template>
  <grid-view>
<!--    <good-list-item v-for="(item,index) in categoriesDetail" :key="index" :goods="item"> </good-list-item>-->
  </grid-view>
</template>

<script>
import GridView from "@/components/common/gridView/GridView";
import GoodListItem from "@/components/content/goods/GoodListItem";
export default {
  name: "TabContentDetail",
  components:{
    GridView,
    GoodListItem
  },
  props: {
    // categoriesDetail:{
    //   type:Array,
    //   default(){
    //     return []
    //   }
    // }
  },
}
</script>

<style scoped>

</style>