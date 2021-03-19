import {request} from "./request";
import {request1} from "./request";

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

//使用网易云音乐API
export function getHomeGoods(type,page) {
  return request({
    url: '/home/data',
    params:{
      type,
      page
    }
  })
}

// 函数调用 -> 压入函数栈(保存函数调用过程中所有变量)
// 函数调用结束 -> 弹出函数栈(释放函数所有的变量)
// function test() {
//   const names = ['why', 'aaa']
// }
//
// test()
//
// test()
