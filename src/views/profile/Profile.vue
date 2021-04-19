<template>
  <div id="profile">
    <!-- 顶部nav-bar -->
    <nav-bar class="nav-bar"><div slot="center">商城</div></nav-bar>
    <!--  用户登录信息栏  -->
    <user-info></user-info>
    <!--  账户相关信息栏  -->
    <section class="account">
      <div class="account-item">
        <div class="number">
          <span class="balance">0.00</span>元
        </div>
        <div class="account-info">我的余额</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">0</span>个
        </div>
        <div class="account-info">我的优惠</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">0</span>分
        </div>
        <div class="account-info">我的积分</div>
      </div>
    </section>
    <list-view>
      <list-view-item>
        <img slot="icon" src="~assets/img/profile/message.svg" alt="">
        <div slot="text">消息</div>
      </list-view-item>
      <list-view-item>
        <img slot="icon" src="~assets/img/profile/mall.svg" alt="">
        <div slot="text">商城</div>
      </list-view-item>
      <list-view-item>
        <img slot="icon" src="~assets/img/profile/vip.svg" alt="">
        <div slot="text">会员卡</div>
      </list-view-item>
      <list-view-item>
        <img slot="icon" src="~assets/img/profile/mall.svg" alt="">
        <div slot="text">商城</div>
      </list-view-item>
      <list-view-item>
        <img slot="icon" src="~assets/img/profile/cart.svg" alt="">
        <div slot="text">购物车</div>
      </list-view-item>
    </list-view>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import UserInfo from "@/views/profile/childComponents/UserInfo";
import ListView from "@/views/profile/childComponents/ListView";
import ListViewItem from "@/views/profile/childComponents/ListViewItem";
export default {
  name: "Profile",
  components:{
    NavBar,
    UserInfo,
    ListView,
    ListViewItem
  }
}
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
.account {
  display: flex;
  border-bottom: 10px solid #eee;
}
.account-item {
  width: 100%;
  background-color: #fff;
  margin-right: 1px;
  text-align: center;
}
.account-item:last-of-type {
  margin-right: 0;
}
.account-item {
  color: #666;
  font-size: 13px;
  padding: 18px;
}
.account-item .balance {
  font-size: 24px;
  font-weight: 700;
  color: #ff5f3e;
}
.account-info {
  margin-top: 6px;
}
</style>