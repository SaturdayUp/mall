<template>
  <div class="tab-control">
    <div v-for="(title,index) in titles"
         class="tab-control-item"
         @click="clickItem(index)">
      <span :class="{isActive:currentIndex===index}">{{title}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
      currentIndex:0
    }
  },
  methods:{
    clickItem(index){
      this.currentIndex=index
    //  点击不同的tabcontrol把事件传递给父元素的home，让其请求相应的数据进行显示
      this.$emit('tabClick',index)
    }
  }
}
</script>

<style scoped>
.tab-control{
  display: flex;
  height: 44px;
  line-height: 44px;
  text-align: center;
  background-color: #fff;
}
.tab-control-item{
  flex: 1;
}
.tab-control span{
  padding: 5px ;
}
.isActive{
  color: var(--color-tint);
  border-bottom: 2px solid var(--color-tint);
}
</style>