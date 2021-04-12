<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
//要想使用第三方库，一定要有封装的思想，要不然后期维护起来会很麻烦
import BScroll from 'better-scroll'
export default {
  name: "Scroll",
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default: false
    }
  },
  data(){
    return{
      scroll:null
    }
  },
  mounted() {
    //1.在mounted函数中创建better-scroll对象
    this.scroll=new BScroll(this.$refs.wrapper,{
      //在这里传入一些对于better-scroll基本的要求参数
      probeType:this.probeType,
      pullUpLoad: this.pullUpLoad,
      click:true,
      observeDOM:true
    })
    //2.监听滚动的位置
      //2.1 只有当probetype的值为2或3时才会监听滚动
      if (this.probeType===2||this.probeType===3){
        //调用scroll的on进行监听实时位置，传入两个参数，每次滚动时调用第二个参数传入的函数
        this.scroll.on('scroll',(position)=>{
          //向外面发送scroll事件，并将此时的position作为参数传出去
          // console.log(position);
          this.$emit('scroll',position)

        })
      }
    //3.完成上拉加载更多功能
      if (this.pullUpLoad){
        this.scroll.on('pullingUp',()=>{
          this.$emit('pullingUp')
        })
      }
  },

  methods:{
    scrollTo(x,y,time=300){
      this.scroll&&this.scroll.scrollTo(x,y,time)
    },
    refresh(){
      this.scroll&&this.scroll.refresh()
    },
    finishPullUp(){
      this.scroll&&this.scroll.finishPullUp()
    }
  }
}
</script>

<style scoped>

</style>