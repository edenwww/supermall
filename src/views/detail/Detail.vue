<template>
    <div id="detail">
      <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
      <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
        <detail-swiper :top-images="topImages"/>
        <detail-base-info :goods="goods"/>
        <detail-shop-info :shop="shop"/>
        <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
        <detail-param-info :param-info="paramInfo" ref="params"/>
        <detail-comment-info :comment-info="commentInfo" ref="comment"/>
        <goods-list ref="recommend" :goods="recomends"/>
      </scroll>
      <detail-bottom-bar @addToCart="addToCart"/>
<!--      native：组件内部触发点击事件   -->
      <back-top @click.native="backTop" v-show="isShowBackTop"/>
    </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from "components/content/goods/GoodsList";

  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail";
  import {debounce} from "common/utils";
  import {itemListenerMixin,backTopMixin} from "common/mixin";

  // import {mapActions} from "vuex";

  export default {
      name: "Detail",
      components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        DetailBottomBar,
        Scroll,
        GoodsList
      },
      mixins:[itemListenerMixin,backTopMixin],
      data(){
        return {
          iid:null,
          topImages:[],
          goods:{},
          shop:{},
          detailInfo:{},
          paramInfo:{},
          commentInfo:{},
          recomends:[],
          themeTopYs:[],
          getThemeTopY:null,
          currentIndex:0,
          isShowBackTop:false,
        }
      },
      created() {
      //  1.保存传入的iid
        this.iid = this.$route.params.iid

      //  2.根据iid请求详情数据
        getDetail(this.iid).then(res => {
          //1.获取顶部的图片轮播数据
          const data = res.result;
          // console.log(data);
          this.topImages = data.itemInfo.topImages
        //  2.获取商品信息,把需要的数据都封装到以对象中
          this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        //  3.创建店铺信息的对象
          this.shop = new Shop(data.shopInfo)
        //  4.保存商品的详情数据
          this.detailInfo = data.detailInfo;
        //  5.获取参数的信息
          this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        //  6.保存评论数据
        //   console.log(data.rate.list.length);
          if(data.rate.cRate != 0){//评论可能为空
            // console.log(data.rate);
            this.commentInfo = data.rate.list[0];
          }

        });
        //获取推荐列表
        getRecommend().then((res) => {
          this.recomends = res.data.list;
        });

        //获取商品详情页顶部栏： 商品、参数、评论、推荐对应的y坐标
        this.getThemeTopY = debounce(() => {
          this.themeTopYs = [];
          this.themeTopYs.push(0);
          this.themeTopYs.push(this.$refs.params.$el.offsetTop);
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
          //为了防止越界，存入JavaScript中的最大值
          this.themeTopYs.push(Number.MAX_VALUE);
        },100);
      },
    methods:{
      // ...mapActions(["addCart"]),
      imageLoad(){
        this.$refs.scroll.refresh()
        this.getThemeTopY();
      },
      titleClick(index){
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
      },
      //DetailNavBar随着页面滚动改变状态
      contentScroll(position){
        const positionY = -position.y;
        let length = this.themeTopYs.length;

        for(let i = 0;i < length - 1;i++){
          if (this.currentIndex !== i && positionY > this.themeTopYs[i]
            && positionY < this.themeTopYs[i+1]){
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex;
          }
        }
        this.listenShowBackTop(position);
      },
      addToCart(){
        const product = {};
        product.iid = this.iid;
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;

        this.$store.dispatch("addCart",product)

        // this.addCart(product).then((res) => {
        //   // this.$toast.show(res,2000)
        // })
      }
    }
  }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index:9;
    background-color: #fff;
    /*父元素要有确定的高度*/
    /*与height:100vh;效果相同*/
    /*height:100%;*/
    height:100vh;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  /*需要设置滚动高度*/
  .content{
    height:calc(100% - 44px - 49px);
  }

</style>
