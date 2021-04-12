<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar"
}
</script>

<style scoped>
#tab-bar{
  display: flex;
  height: 49px;
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0px;
  background-color: #ffffff;
  box-shadow: 0 -1px 10px #999999;
  touch-action: none;
}
</style>