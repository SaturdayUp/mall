<template>
  <div id="user-info">
    <a href="#" class="clear-fix">
      <div class="user">
        <div class="user-icon">
          <slot name="user-icon">
            <img src="~assets/img/profile/avatar.svg" alt="">
          </slot>
        </div>
        <div class="login-info left">
          <slot name="user-nickname">
            <div>登录/注册</div>
          </slot>
          <div class="phone">
          <span>
            <img src="~assets/img/profile/phone.svg" alt="">
          </span>
            <slot name="user-phone">登录绑定手机号</slot>
          </div>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: "UserInfo"
}
</script>

<style scoped>
#user-info {
  background-color: lightcoral;
  padding: 15px;
  margin-top: -5px;
}
.user{
  display: flex;
}
.user-icon{
  width: 70px;
  height: 70px;
}
.user-icon img{
  width: 60px;
  height: 60px;
}
.left {
  float: left;
}
#user-info .login-info {
  color: #fff;
  margin: 10px 0 0 10px;
  flex: 1;
}
#user-info .login-info .phone {
  position: relative;
  font-size: 13px;
  margin-top: 5px;
  margin-left: 15px;
  font-weight: 300;
}
.phone img{
  width: 20px;
  height: 20px;
  position: absolute;
  left: -19px;
  top: -3px;
  margin-right: 5px;
}
</style>