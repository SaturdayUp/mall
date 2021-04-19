<template>
  <scroll id="tab-menu">
    <div class="menu-list">
      <div class="menu-list-item"
           v-for="(item,index) in categories"
           :class="{active:index===currentIndex}"
           :key="index"
           @click="itemClick(index)">
        {{item.title}}
      </div>
    </div>
  </scroll>
</template>

<script>
import Scroll from "@/components/common/scroll/Scroll";
export default {
name: "TabMenu",
  components:{
    Scroll
  },
  props:{
    categories:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return{
      currentIndex:0
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex=index
      //向category发送一个事件，当点击不同的item时，分类页去请求不同的数据
      this.$emit('selectItem',index)
    }
  }
}
</script>

<style scoped>
#tab-menu{
  background-color: #f6f6f6;
  height: 100%;
  width: 100px;
  box-sizing: border-box;
}
.menu-list-item{
  height: 45px;
  line-height: 45px;
  font-size: 12px;
  text-align: center;
}
 .active{
  background-color: #fff;
  color: #FF852A;
  border-left: 2px solid #FF852A;
}
</style>