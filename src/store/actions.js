import {ADD_COUNTER,ADD_TO_CART} from './mutations-types'

export default {
  addCart(context,product)
  {
    let oldProduct=null
    for (let item of context.state.cartList){
      if(item.iid==product.iid)
        oldProduct=item
    }

    if ( oldProduct!=null )
    {
      context.commit("addCounter",oldProduct)
    }
    else
    {
      //该商品第一次加入购物车，count初始化为1
      product.count=1
      context.commit("addCart",product)
    }
  }
}
