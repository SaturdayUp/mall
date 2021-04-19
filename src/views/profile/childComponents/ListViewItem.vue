<template>
  <div class="list-view-item">
    <div class="item">
      <div class="icon"><slot name="icon"></slot></div>
      <div class="text"><slot name="text"></slot></div>
    </div>

  </div>
</template>

<script>
export default {
  name: "ListViewItem"
}
</script>

<style scoped>
.item{
  display: flex;
  margin: 10px 20px;

}
.icon{
  width: 30px;
  height: 30px;
}
.icon img{
  width: 25px;
  height: 25px;
  margin: 3px 5px;
}
.text{
  flex: 1;
  margin:  auto 10px;
  font-size: 16px;
  border-bottom: 1px solid #eee;
  padding: 7px 2px;
}
</style>