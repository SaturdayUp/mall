import Vue from 'vue'
import Vuex from'vuex'
import mutations from "@/store/mutations";
import actions from "@/store/actions";
import getters from "@/store/getters";

//1.安装vuex插件
Vue.use(Vuex)
//2.定义一个state，将状态保存在state中
const state={
  cartList:[]
}
//3.创建Vuex对象
const store=new Vuex.Store({
  state,
  mutations,
  actions,
  getters,

})
export default store