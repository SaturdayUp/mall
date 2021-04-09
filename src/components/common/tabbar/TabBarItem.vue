<template>
  <div class="tab-bar-item" @click="clickItem">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'#FF852A'
    }
  },
  data(){
    return{
      // isActive:true
    }
  },
  computed:{
    //根据计算属性动态决定isActive到底是true还是false
    isActive(){
      // 计算属性需要返回值，记得加return，主要逻辑就是判断当前路由的路径中是否包含传过来的path，包含说明当前item处于活跃状态
     return this.$route.path.indexOf(this.path)!==-1
    },
    //这里动态给字体加入颜色
    activeStyle(){
      //判断当前isActive状态，如果是true加入样式，不是不加
      return this.isActive?{color:this.activeColor}:{}
    }
  },
  methods:{
    clickItem(){
      this.$router.replace(this.path).catch(err=>err)
      // console.log(this.path);
    }
  }
}
</script>

<style scoped>
.tab-bar-item{
  flex: 1;
  text-align: center;
  font-size: 14px;

}
.tab-bar-item img{
  width: 24px;
  height: 24px;
  vertical-align: center;
  margin-top: 2px;
  margin-bottom: 3px;
}
</style>