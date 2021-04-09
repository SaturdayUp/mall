// 使用axios请求网络数据
//导入axios
import axios from 'axios'
//定义一个request函数，并将其导出，需要一个config参数，因为这里只加入了一个baseURL，
// 具体想要访问什么数据，还需要在后面加上其他参数
export function request(config){
//  1.创建一个axios的实例instance，这里这样创建比较简单，我们保存一个基本的URL，
//  后续请求数据只是后面的接口不同，baseURL都是一致的，为了请求其他数据时不在重复写baseURL，这里创建一个实例，
//  后续请求其他数据时，只需要通过instance请求即可
const instance=axios.create({
  baseURL:'http://152.136.185.210:7878/api/m5',
  timeout:5000
})

//  2.创建axios拦截器，此时的拦截只是对baseURL的拦截
//  关于axios拦截器的作用就是在数据请求返回数据之前做一些操作，也就是在then和catch之前做一些必要的操作
//    2.1请求拦截器
  instance.interceptors.request.use(config=>{
    //1、比如config的信息不符合服务器的要求，要对config做一些处理
    //2、比如每次发送网络请求时，都希望在界面中显示一个请求的图标
    //3、某些网络请求必须携带一些特殊的信息
    //数据请求成功，返回参数config
    return config
  },error => {
    //数据请求失败，打印错误提示信息
    console.log('数据请求失败');
  })
//    2.2响应拦截器
  instance.interceptors.response.use(res=>{
      //数据响应成功
      return res.data
  },error => {
    //数据响应失败，打印错误提示信息
    console.log('数据响应失败');
  })

//  3.发送真正的网络请求，这里返回的instance(config)也是一个promise，
//  而使用下面复杂的封装方法返回的也是promise，所以这里使用简单的封装方法，直接将instance返回
  return instance(config)
}

//复杂的axios封装
// export function axios(config){
//   return new Promise((resolve, reject) => {
//     const instance=axios.create({
//       baseURL:'http://152.136.185.210:7878/api/m5',
//       timeout:5000
//     })
//     instance(config).then(res=>{
//       resolve(res)
//     }).catch(err=>{
//       reject(err)
//     })
//   })
// }