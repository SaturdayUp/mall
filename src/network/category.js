import {request} from "@/network/request";

export function _getCategory(){
  return new request({
    url:'/category'
  })
}

export function _getSubCategory(maitKey){
  return new request({
    url:'/subcategory',
    params:{
      maitKey
    }
  })
}

export function _getCategoryDetail(miniWallkey,type){
  return new request({
    url:'/subcategory/detail',
    params:{
      miniWallkey,
      type
    }
  })
}