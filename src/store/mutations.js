import {ADD_COUNTER,ADD_TO_CART} from "@/store/mutations-types";

export default {
  //其中mutations的唯一目的就是修改state中的值
  //mutations的设计原则就是让其中的每个方法完成比较单一的功能，所以涉及到判断和异步操作，我们一般将其放到actions中进行处理
  //所以针对这个项目，我们添加商品时会有两种不同的情况，如果购物车中存在该商品，那么直接将数量加1，如果购物车中不存在该商品，那么将该商品加入到购物车中
  [ADD_COUNTER](state,product){
    product.count+=1
  },
  [ADD_TO_CART](state,product){
    product.checked=true
    state.cartList.push(product)
  }
}