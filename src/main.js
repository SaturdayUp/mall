import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import store from "@/store";
import toast from '@/components/common/toast/index'

Vue.config.productionTip = false
//给vue的原型添加$bus
Vue.prototype.$bus=new Vue()
//安装toast插件,这里只要一执行use，就会跳到index中执行install方法
Vue.use(toast)
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
