<template>
  <div class="toast" v-if="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  data(){
    return{
      message:'',
      isShow:false
    }
  },
  methods:{
    show(message,duration){
      this.isShow=true
      this.message=message
      setTimeout(()=>{
        this.isShow=false
        this.message=''
      },duration)
    }
  }
}
</script>

<style scoped>
.toast{
  width: 250px;
  height: 40px;
  line-height: 20px;
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  padding: 8px 10px;
  color: #fff;
  background-color: rgba(0,0,0,.75);
  z-index: 999;
  border-radius: 10px;
}
</style>