<template>
 <div class="wrapper">
  <div class="mask" @touchstart="isShow=false">
     <div class="share">
         <div class="tit">
             分享
         </div>
         <div class="icons">
             <ul>
                 <li>
                     <span class="iconfont icon-xinlangweibo pic_icon red"></span>
                     <span class="icon_tit">新浪微博</span>
                 </li>
                <li>
                     <span class="iconfont icon-weixin pic_icon green"></span>
                     <span class="icon_tit">微信</span>
                 </li>
                 <li>
                     <span class="iconfont icon-fenxiangweixinpengyouquan pic_icon green"></span>
                     <span class="icon_tit">微信朋友圈</span>
                 </li>
                 <li>
                     <span class="iconfont icon-yinxiangbiji pic_icon green"></span>
                     <span class="icon_tit">印象笔记</span>
                 </li>
                 <li>
                     <span class="iconfont icon-youdaoyunbiji pic_icon blue" ></span>
                     <span class="icon_tit">有道云笔记</span>
                 </li>
                 <li>
                     <span class="iconfont icon-QQ pic_icon blue" ></span>
                     <span class="icon_tit">QQ</span>
                 </li>
                 <li>
                     <span class="iconfont icon-gengduo pic_icon more"></span>
                     <span class="icon_tit">更多平台</span>
                 </li>
             </ul>
         </div>
     </div>
 </div>
 </div>
</template>

<script type="text/ecmascript-6">
export default {
 components: {},
 props: {},
 data () {
 return {
     isShow:'false'
 };
 },
 watch: {},
 computed: {},
 methods: {
//      hide(d){
// this.ev.$on('isSHow',d=>{
// this.isShow=false;
// }
// )
    //  }
 },
 mounted () {}
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/index.styl'
.mask
    z-index 2
    position fixed
    left 0
    top 0
    width 100vw
    height 100vh
    background rgba(0,0,0,0.5)
    .share 
         position absolute
         top 0
         left 0
         right 0
         bottom 0
         margin auto
         background #ffffff
         color #f4f4f4
         width 80%
         height 8rem
         padding .5rem
         box-sizing border-box
         .tit
             height .8rem
             line-height .8rem
             font-size .4rem
             color #000000
             font-weight bold
        .icons
             color #000000
             overflow hidden
             li 
                float left
                margin .3rem .1rem .3rem 0
                // margin-left 0
                width 30%
                height 1.4rem
                line-height 1rem
                // border 1px solid #000000
                text-align center

                span 
                    display block
                .pic_icon 
                    font-size 1rem
                    // line-height 1.4rem
                .red 
                     color #f13f19
                .green
                     color #60c84f
                .blue 
                     color #29a1ed
                .more 
                     color #7f7f7f
                
                    
                .icon_tit
                    line-height .5rem
                   




</style>
