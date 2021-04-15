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
  border-top: 1px solid #eee;
  background-color: #ffffff;
  touch-action: none;
}
</style>