import {ADD_COUNTER,ADD_TO_CART} from "@/store/mutations-types";

export default {
  addCart(context,payload){
    return new Promise((resolve, reject) => {
      //其中payload是新添加的商品
      //遍历一下现在的cartList中是否含有我现在要添加的这个商品，主要就是比较iid
      let oldProduct=null
      for (let item of context.state.cartList){
        if (item.iid===payload.iid){
          oldProduct=item
        }
      }
      if (oldProduct){
        //如果现在不为空，说明现在添加的这个商品购物车中已经有了,就将这个商品的数量+1
        // oldProduct.count+=1
        //这里通过commit向mutations发送事件，在mutations中修改state
        context.commit(ADD_COUNTER,oldProduct)
        resolve('当前商品数量+1')
      }else {
        //如果现在为空，就说明现在购物车中没有该件商品
        payload.count=1
        //将此时的商品添加到cartList中
        // context.state.cartList.push(payload)
        //这里通过commit向mutations发送事件，在mutations中修改state
        context.commit(ADD_TO_CART,payload)
        resolve('添加成功，在购物车中等你哦~')
      }
    })
  }
}