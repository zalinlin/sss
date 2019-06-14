<template>
  <div class="wrapper">
    <!-- -----header -->
    <div class="header">
      <ul class="left">
        <li class="back_to" @touchstart="backTo()">
          <span class="iconfont icon-fanhuijiantou"></span>
        </li>
        <li>
          <span class="comment_num">{{extraInformation.comments}}条点评</span>
        </li>
      </ul>
      <ul class="right">
        <li class="last">
          <!-- <span class="iconfont icon-pinglun"></span> -->
          <div class="iconfont icon-pinglun"></div>
        </li>
      </ul>
    </div>
    <div class="comment_cont">
      <div class="allLong">
        <h1 class="long_comment">{{extraInformation.long_comments}}条长评</h1>
        <div class="pic_longCom_wrap" v-if="extraInformation.long_comments==0">
          <div class="pic_longCom" >
          <span class="iconfont icon-shafa"></span>
          <p>深度长评虚位以待</p>
        </div>
        </div>

      <!-- --------长评论 ---------->
      
        <div class="box" v-for="item in longComments" :key="item.id">
          <div class="box_left">
            <img
              class="avata_img"
              :src="item.avatar"
              style="width:0.8rem;
           height:0.8rem; 
           border-radius: 50%;"
              alt
            >
          </div>
          <div class="box_right">
            <h3>{{item.author}}</h3>
            <div class="like">
              <span class="iconfont icon-zan1"></span>
              <span class="like_num">{{item.likes}}</span>
            </div>

            <p class="comment_detail">{{item.content}}</p>

            <!-- <p class="comment_time">{{item.time|timeFilter}}</p> -->
            <p class="comment_time">{{item.time|timeFilter}}</p>
          </div>
        </div>
      </div>

      <!-- --------短评论 ---------->
      <div class="short_comment">
        <h1 class="short_comment_tit">{{extraInformation.short_comments}}条短评</h1>
        <span class="iconfont icon-shuangjiantou-xia" @touchstart="toShort()" v-if="isShow==false"></span>

         <span class="iconfont icon-shuangjiantou-shang" @touchstart="toLong()" v-if="isShow==true"></span>
        <div class="short_comment_cont" v-if="isShow==true">
          <div class="box short" v-for="item in shortComments" :key="item.id">
            <div class="box_left">
              <img
                class="avata_img"
                :src="item.avatar"
                style="width:0.8rem;
           height:0.8rem; 
           border-radius: 50%;"
                alt
              >
            </div>
            <div class="box_right">
              <h3>{{item.author}}</h3>
              <div class="like">
                <span class="iconfont icon-zan1"></span>
                <span class="like_num">{{item.likes}}</span>
              </div>

              <p class="comment_detail">{{item.content}}</p>

              <p class="comment_time">{{item.time|timeFilter}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import vShare from "../views/share";
import API from "../../common/js/API";
export default {
  components: {
    vShare
  },
  props: {},
  data() {
    return {
      extraInformation: "",
      longComments: [],
      shortComments: [],
      isShow: false
    };
  },
  watch: {},
  computed: {},
  methods: {
    backTo() {
      this.$router.go(-1);
    },
    toShort() {
      this.$(".allLong").slideUp(400,function(){
        document.body.scrollTop=0;
        document.documentElement.scrollTop=0;
      });    
      this.isShow = true;
    },
    toLong(){
      this.$(".allLong").slideDown(400,function(){
        document.body.scrollTop=0;
        document.documentElement.scrollTop=0;
      });    
            this.isShow = false;
          }
  },
  mounted() {
    var id = this.$route.params.id;
    this.id = id;
    // this.ev.$emit('id');
    console.log(id);
    //  其他信息
    this.$http({
      url: API.extraInformation + id
    }).then(d => {
      this.extraInformation = d.data;
      // console.log(this.extraInformation)
    });

    //长评论
    var id = this.$route.params.id;
    this.$http({
      url: API.longComment + id + "/long-comments"
    }).then(d => {
      this.longComments = d.data.comments;
      console.log(this.longComments)
    });

    //短评论
    var id = this.$route.params.id;
    this.$http({
      url: API.shortComments + id + "/short-comments"
    }).then(d => {
      this.shortComments = d.data.comments;
      // console.log(this.longComments)
    });
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/index.styl';

.wrapper {
  position: relative;
}

.header {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1;
  width: 100vw;
  box-sizing border-box
  height: 1.2rem;
  line-height: 1.2rem;
  font-weight: bold;
  text-align: left;
  background: #00a2ed;
  padding: 0 0.5rem;
  color: #ffffff;
  overflow: hidden;

  .left {
    float: left;
    overflow: hidden;

    li {
      float: left;
      margin-right: 0.7rem;

      .iconfont {
        font-size: 0.3rem;
      }
    }
  }

  .right {
    float: right;
    overflow: hidden;

    li {
      .iconfont {
        font-size: 0.5rem;
        color: #ffffff;
      }
    }
  }
}

.comment_num {
  font-size: 0.35rem;
}

.comment_cont {
  margin-top: 1.2rem;

  .long_comment {
    height: 0.8rem;
    line-height: 0.5rem;
    font-size: 0.3rem;
    padding: 0.2rem;
    box-sizing: border-box;
    border-bottom: 1px solid #cccccc;
    color: #323232;
    font-weight: normal;
  }
  .pic_longCom_wrap{
    height 9.8rem
  }
  .pic_longCom {
 
    position: absolute;
    top: 4.5rem;
    left: 2.5rem;
    color: #e4e4e4;
    font-size: 0.3rem;
    margin-bottom: 3rem;

    span {
      font-size: 2rem;
      color: #e4e4e4;
    }
  }

  .short_comment {
    height: 0.8rem;
    line-height: 0.4rem;
    padding: 0.2rem;
    box-sizing: border-box;
    font-weight: normal;
    width: 100vw;
    border-top: 1px solid #cccccc;
    border-bottom: 1px solid #cccccc;

    .short_comment_tit {
      font-size: 0.3rem;
      height: 0.8rem;
      line-height: 0.4rem;
      color: #323232;
    }

    .icon-shuangjiantou-xia {
      position: absolute;
      right: 0.3rem;
      bottom: 0.2rem;
    }

    .icon-shuangjiantou-shang {
      position: absolute;
      right: 0.3rem;
      bottom: 0.2rem;
    }


  }
}

// ----------长评论不为0时----
.box {
  overflow: hidden;
  border-bottom: 1px solid #cccccc;

  .box_left {
    float: left;
    width: 1rem;
    padding: 0.2rem;
    box-sizing: border-box;
    // border: 1px solid #000000;
  }

  .box_right {
    float: left;
    position: relative;
    width: 5.5rem;
    margin-left: 0.2rem;

    h3 {
      font-weight: bold;
      line-height: 0.6rem;
    }

    .like {
      position: absolute;
      right: 0;
      top: 0.1rem;
      height: 0.2rem;

      span {
        color: #b8b8b8;
      }
    }

    .icon-zan1 {
      font-size: 0.2rem;
      color: #f4f4f4;
    }

    .like_num {
      font-size: 0.2rem;
      color: #f4f4f4;
    }

    .comment_detail {
      line-height: 0.5rem;
      font-size: 0.3rem;
    }

    .comment_time {
      color: #b8b8b8;
      line-height: 1rem;
    }
  }
}


  
</style>
