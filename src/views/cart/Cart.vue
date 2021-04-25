<template>
  <div class="cart">
    <!-- 顶部导航栏   -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartCount}})</div>
    </nav-bar>
    <!-- 中部列表栏   -->
    <cart-list/>
    <!-- 底部购买栏   -->
    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import CartList from "@/views/cart/childComponents/CartList";
import CartBottomBar from "@/views/cart/childComponents/CartBottomBar";
import {mapGetters} from 'vuex'
export default {
  name: "Cart",
  components:{
    NavBar,
    CartList,
    CartBottomBar
  },
  computed:{
    ...mapGetters([
        "cartCount"
    ])
    // cartLength(){
    //   return this.$store.state.cartList.length
    // }
  }
}
</script>

<style scoped>
.cart{
  position: relative;
  height: 100vh;
}
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
}

</style>