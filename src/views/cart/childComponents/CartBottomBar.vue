<template>
  <div class="bottom-bar">
    <div class="bottom-left">
      <check-button @click.native="checkClick" :is-check="isAllChecked"></check-button>
      <span>全选</span>
    </div>
    <div class="bottom-center">
      合计:￥{{totalPrice}}
    </div>
    <div class="bottom-right">
      结算（{{calculate}}）
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import CheckButton from "@/components/content/checkButton/CheckButton";
export default {
  name: "CartBottomBar",
  components:{
    CheckButton
  },
  computed:{
    ...mapGetters(['cartList']),
    totalPrice(){
      return this.cartList.filter(item=>{
        return item.checked
      }).reduce((preValue,item)=>{
        return preValue+item.price*item.count
      },0).toFixed(2)
    },
    calculate(){
      return this.cartList.filter(item=>{
        return item.checked
      }).length
    },
    isAllChecked(){
      //如果当前购物车为空，那么说明没有商品，那么一定返回false
      if (this.cartList.length===0) return false
      //如果发现购物车中有商品，那么还要看是否有未选中的商品，如果有的话返回false
      return !this.cartList.find(item=>{
        return !item.checked
      })
    }
  },
  methods:{
    checkClick(){
      //如果全选按钮选中了，那么遍历所有的item，将其checked设置为false
      if (this.isAllChecked){
        this.cartList.forEach(item=>item.checked=false)
      }else {
        //否则将所有的item设置为true
        this.cartList.forEach(item=>item.checked=true)
      }
    }
  }
}
</script>

<style scoped>
.bottom-bar{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 49px;
  height: 40px;
  background-color: #fff;
  display: flex;
  align-items: center;
  box-shadow: -3px 0 10px #aaa;
  font-size: 14px;
}
.bottom-left{
  display: flex;
  width: 80px;
  margin-left: 10px;
}
.bottom-left span{
  margin-left: 5px;
}
.bottom-center{
  flex: 1;
  text-align: right;
  margin-right: 10px;

}
.bottom-right{
  width: 80px;
  height: 30px;
  margin-right: 5px;
  text-align: center;
  line-height: 30px;
  background-color: #ffa500;
  border-radius: 30px;
}
</style>