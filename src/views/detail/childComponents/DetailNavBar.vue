<template>
  <nav-bar>
    <div slot="left" class="back" @click="back">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="title">
      <div v-for="(title,index) in titles"
           class="title-item"
           :class="{active:currentIndex===index}"
          @click="titleClick(index)">{{title}}</div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  components:{
    NavBar
  },
  data(){
    return{
      titles:['商品','参数','评论','推荐'],
      currentIndex:0
    }
  },
  methods:{
    back(){
      this.$router.back()
    },
    titleClick(index){
      this.currentIndex=index
      this.$emit('clickTitle',index)
    }
  }
}
</script>

<style scoped>
.title{
  display: flex;
}
.title-item{
  flex: 1;
}
.back{
  margin-top: 7px;
}
.active{
  color: #FF852A;
}
</style>