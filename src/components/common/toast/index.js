import Toast from "@/components/common/toast/Toast";
const obj={}

obj.install=function (Vue){
  //1.创建组件构造器
  const toastConstructor=Vue.extend(Toast)
  //2.根据组件构造器创建一个组件对象
  const toast=new toastConstructor()
  //3.将组件对象用手动的方式挂载到一个dom元素上
  toast.$mount(document.createElement('div'))
  //4.此时就能拿到toast.$el了，否则的话是拿不到$el的,拿到$el后将其添加到body上
  document.body.appendChild(toast.$el)
  //5.将Toast的组件对象添加到Vue的原型中，让所有的组件都可以使用toast
  Vue.prototype.$toast=toast
}
export default obj