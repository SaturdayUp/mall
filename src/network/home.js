// 首页请求的相关数据
import {request} from "@/network/request";

export function getHomeMultidate(){
  return request({
    url:'/home/multidata'
  })
}