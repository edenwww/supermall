<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"/>
    <recommend-view :recommends="recommends"/>
    <feature-view/>
    <tab-control class="tab-controll"
                 :titles="['流行','新款','精选']"
                  @tabClick="tabClick"/>
    <goods-list :goods="showGoods"/>


  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";


  import TabControl from "components/content/tabControl/TabControl";

  import {getHomeMultidata,getHomeGoods} from "network/home";
  import GoodsList from "../../components/content/goods/GoodsList";

    export default {
      name: "Home",
      components:{
        GoodsList,
        TabControl,
        NavBar,
        HomeSwiper,
        RecommendView,
        FeatureView
      },
      data(){
        return {
          banners:[],
          recommends:[],
          goods:{
            'pop':{page:0,list:[]},
            'new':{page:0,list:[]},
            'sell':{page:0,list:[]},
          },
          currentType:'pop',
        }
      },
      computed:{
        showGoods(){
         return this.goods[this.currentType].list
        }
      },
      created() {
      //  1.请求多个数据
        this.getHomeMultidata()
      //  请求商品数据
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')

      },
      methods:{
        /**
         * 事件监听相关的方法
         */
        tabClick(index){
          switch(index){
            case 0:
              this.currentType = 'pop'
              break
            case 1:
              this.currentType = 'new'
              break
            case 2:
              this.currentType = 'sell'
              break
          }
        },
        /**
         * 网络请求相关的方法
         */
        getHomeMultidata(){
          getHomeMultidata().then(res => {
            // this.result = res;
            // console.log(res)
            this.banners = res.data.banner.list;
            this.recommends = res.data.recommend.list;
          })
        },
        getHomeGoods(type){
          const page = this.goods[type].page + 1
          getHomeGoods(type,page).then(res => {
            // console.log(res)
            this.goods[type].list.push(...res.data.list)
            this.goods[type].page += 1

          })
        }
      }
    }
</script>

<style scoped>
  .home-nav{
    background-color: var(--color-tint);
    color:#fff;
  }
</style>
