<template>
  <div class="wrapper">
    <!-- --------share -->
    <div class="mask" v-if="isShow==true"
     @touchstart.self="isShow=false"
    >
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

 <!-- -----header -->
    <div class="header">
      <ul class="left">
        <li class="back_to" @touchstart="backTo()">
          <span class="iconfont icon-fanhuijiantou"></span>
        </li>
      </ul>
      <ul class="right">
        <li @touchstart="isShow=true">
          <span class="iconfont icon-fenxiang3"></span>
        </li>
        <li @touchstart="collection()" >
          <span class="iconfont icon-xingxing star" v-if="isYellow==false"></span>
          <span class="iconfont icon-xingxing star" v-if="isYellow==true"></span>
        </li>
        <li @touchstart="toComment(newsDetail.id)">
          <span class="iconfont icon-wode"></span>
          <span class="msg_num">{{extraInformation.comments}}</span>
        </li>
        <li class="last">
          <span class="iconfont icon-zan1" @touchstart="addLike()"></span>
          <span class="like_num">{{extraInformation.popularity}}</span>
        </li>
      </ul>
    </div>



<!-- -----banner -->
    <div class="banner">
      <!-- <img
        src="http://b-ssl.duitang.com/uploads/item/201608/21/20160821230024_MyCYK.thumb.700_0.jpeg"
        alt
      >
      <p class="banner_tit">百度最难捱的一夜</p>
    </div> -->
      <img
        :src="newsDetail.images"
        alt
      >
      <p class="banner_tit">{{newsDetail.title}}</p>
    </div>

   <div class="news_detail" v-html="newsDetail.body">
    
   </div>
  </div>
</template>

<script type="text/ecmascript-6">
import API from "../../common/js/API";
import vShare from "../views/share";
export default {
  components: {
    // vShare
  },
  props: {},
  data() {
    return {
      datail: [],
      isShow:false,
      isYellow:false,
      newsDetail:'',
      extraInformation:'',
       iscollect:false,
       isLike:false,
      //  title:'',
    };
  },
  watch: {},
  computed: {},
  methods: {
    backTo() {
      this.$router.go(-1);
    },
    toComment(id){
      this.$router.push('/comment/'+id)
    },
    //收藏
    collection(){
         var arr=localStorage.getItem('arr')?JSON.parse(localStorage.getItem('arr')):[];
        //  console.log(arr.some(item=>item.id==this.$route.params.id))
         if(arr.some(item=>item.id==this.newsDetail.id)){//有当前id的这条信息，删除
            this.iscollect=false;
            var star=document.querySelector('.star');
          star.style.color='white';
            for(var i=0;i<arr.length;i++){
                if(arr[i].id==this.newsDetail.id){
                    arr.splice(i,1);
                    break;
                }
            }
         }else{// push
            this.iscollect=true;
            arr.push({
                title:this.newsDetail.title,
                images:this.newsDetail.images,
                id:this.newsDetail.id
            });
             var star=document.querySelector('.star');
          star.style.color='yellow';
         }
        
         localStorage.setItem('arr',JSON.stringify(arr));
     },
  addLike(){
    var like=document.querySelector('.icon-zan1');
      var like_num=document.querySelector('.like_num')
    if(this.isLike==false){
      like.style.color='red';
      like_num.innerHTML=this.extraInformation.popularity+1;
      this.isLike=true;
    }else{
      like.style.color='white';
      like_num.innerHTML=this.extraInformation.popularity;
      this.isLike=false;

    }
     
     }
  
  },
  mounted() {
    var id = this.$route.params.id;
    //新闻
    this.$http({
      url: API.newsCont+id,
    }).then(d => {
      this.newsDetail=d.data;
      // console.log(d.data);
       this.title=d.data.title;
    });

     //  其他信息
    this.$http({
      url:API.extraInformation+id
    }).then(d=>{
      this.extraInformation=d.data;
    });


    // 进来判断是否收藏
    var id=this.$route.params.id;
     var arr=localStorage.getItem('arr')?JSON.parse(localStorage.getItem('arr')):[];
    if(arr.some(item=>item.id==this.$route.params.id)){
        this.iscollect=true;
         var star=document.querySelector('.star');
          star.style.color='yellow';
    }else{
        this.iscollect=false;
         var star=document.querySelector('.star');
          star.style.color='white';
    }
    // 判断结束

    // console.log(this.$route.params);
    
    
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/index.styl';
//share
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
                   

// header
.header 
  height: 1.2rem;
  line-height: 1.2rem;
  font-weight: bold;
  text-align: left;
  background: #00a2ed;
  padding: 0 0.5rem;
  color: #ffffff;
  overflow: hidden;

  .left 
    float: left;
    overflow: hidden;

    li 
      float: left;
      margin-right: 0.7rem;

      .iconfont 
        font-size: 0.3rem;
   

  .right 
    float: right;
    overflow: hidden;

    li 
      float: left;
      margin-right: 0.5rem;

      .iconfont 
        font-size: 0.4rem;
      
      .like_num
         font-size .3rem
         padding-left .05rem
      .msg_num
         font-size .3rem
         padding-left .1rem

    

    .last 
      margin-right: 0;
    
  
 


// banner
.banner {
  position: relative;
  height: 4rem;

  // border: 1px solid #000000;
  img {
    width: 100vw;
    height: 4rem;
  }

  .banner_tit {
    z-index 3
    position: absolute;
    left: 0;
    bottom: 0.5rem;
    line-height: 0.5rem;
    font-size: 0.4rem;
    color: #ffffff;
    padding-left: 0.2rem;
  }
}
.news_detail 
   width 100vw
   padding .3rem
   box-sizing border-box
.wrapper  >>> img
         width 100%
         margin auto
.wrapper >>> .meta
   margin .3rem 0
   height .6rem
   overflow hidden
.wrapper  >>> .avatar 
         width 0.5rem
         height 0.5rem
         vertical-align top
.wrapper  >>> .author
        font-weight bold
        font-size .35rem
        line-height .6rem
        margin 0 .2rem
.wrapper  >>> .bio
         color #949494
         font-size .3rem
         line-height .6rem
        

.wrapper >>> p  
   font-size .35rem
   line-height .5rem
   color #292929
   margin-bottom .3rem
   strong 
      a
         color #310972
         font-weight bold
         text-decoration none
.wrapper >>> blockquote
   font-size .35rem
   line-height .5rem
   color #292929
   margin-bottom .3rem

.wrapper >>> .view-more    
   display block
   background #f3f3f3   
   text-align center
   padding .2rem 0
   margin .3rem 0
   a
      color #949494
      text-decoration none
      font-size .3rem
     
  //  img 
  //    width 3rem  !important
</style>
