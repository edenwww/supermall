<template>
    <div class="wrapper" ref="wrapper">
      <div class="content">
        <slot></slot>
      </div>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'

    export default {
      name: "Scroll",
      props:{
        probeType:{
          type:Number,
          default:0
        },
        pullUpLoad:{
          type: Boolean,
          default: false
        }
      },
      data(){
        return {
          scroll:null,
          message:'哈哈哈'
        }
      },
      mounted() {
        //  1.创建BScroll对象
        this.scroll = new BScroll(this.$refs.wrapper,{
          click:true,
          //解决滚动不了的问题，
          // （除了这种方法还可以使用图片加载完时调用scroll.refresh方法）
          // observeDOM: true,
          probeType: this.probeType,
          pullUpLoad: this.pullUpLoad
        })

        //  2.监听滚动的位置
        if(this.probeType === 2 || this.probeType ===4){
          this.scroll.on('scroll',(position) => {
            console.log(position)
            this.$emit('scroll',position)
          })
        }

        // 3.监听scroll滚动到底部
        if(this.pullUpLoad){
          this.scroll.on('pullingUp', () => {
            this.$emit('pullingUp')
          })
        }
      },
      methods:{
        //time->速度
        scrollTo(x,y,time=300){
          //判断scroll对象是否创建
          this.scroll && this.scroll.scrollTo(x,y,time)
        },
        refresh(){
          this.scroll && this.scroll.refresh()
        },
        finishPullUp(){
          this.scroll && this.scroll.finishPullUp()
        },
        getScrollY(){
          return this.scroll ? this.scroll.y : 0
        }
      }


    }
</script>

<style scoped>

</style>
