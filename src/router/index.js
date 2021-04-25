//1.导入所需要的库
import Vue from 'vue'
import VueRouter from "vue-router";
//使用懒加载的形式导入组件
const Home=()=>import('@/views/home/Home')
const Category=()=>import('@/views/category/Category')
const Cart=()=>import('@/views/cart/Cart')
const Profile=()=>import('@/views/profile/Profile')
const Detail=()=>import('@/views/detail/Detail')
// import Home from "@/views/home/Home"
// import Category from "@/views/category/Category"
// import Cart from "@/views/cart/Cart"
// import Profile from "@/views/profile/Profile"
// import Detail from "@/views/detail/Detail";
Vue.config.productionTip=false

//2.安装vue-router插件
Vue.use(VueRouter)

//3.创建路由映射表
const routes=[
  {
    path:'',
    redirect:'/home'
  },
  {
    path: '/home',
    component:Home
  },
  {
    path:'/category',
    component:Category
  },
  {
    path: '/cart',
    component:Cart
  },
  {
    path:'/profile',
    component:Profile
  },
  {
    path: '/detail/:iid',
    component:Detail
  }
]

//4.创建router对象
const router=new VueRouter({
  routes,
  mode:"hash"
})
//5.将router导出
export default router