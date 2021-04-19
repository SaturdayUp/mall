<template>
  <div class="list-view">
   <slot></slot>
  </div>
</template>

<script>
import ListViewItem from "@/views/profile/childComponents/ListViewItem";
export default {
  name: "ListView",
  components:{
    ListViewItem
  }
}
</script>

<style scoped>
.list-view img{
  width: 25px;
  height: 25px;
}
</style>