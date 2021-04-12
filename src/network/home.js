// 首页请求的相关数据
import {request} from "@/network/request";
//1.请求首页轮播图和推荐相关数据
export function getHomeMultidate(){
  return request({
    url:'/home/multidata'
  })
}

//2.请求goodsList相关数据
export function getHomeData(type,page){
  return request({
    url:'/home/data',
    //此处必须传入参数params，单纯的请求/home/data会请求不到数据，后面必须加上参数
    params:{
      type,
      page
    }
  })
}
