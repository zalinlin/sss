<template>
  <div class="wrapper">
    <!-- ----------header -->
    <div class="header">
      <ul class="left">
        <li @touchstart="showNav()">
          <span class="iconfont icon-gengduo1"></span>
        </li>
        <li>
          <span>{{name}}</span>
        </li>
      </ul>
      <ul class="right">
        <li>
          <span class="iconfont icon-lingdang"></span>
        </li>
        <li class="last">
          <span class="iconfont icon-gengduo2"></span>
        </li>
      </ul>
    </div>

    <!-- ----------banner -->
    <div class="banner">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(item,index) in banners" :key="index">
          <img :src="item.image" alt @touchstart="toNewsCont(item.id)">
          <p class="banner_tit">{{item.title}}</p>
        </mt-swipe-item>
      </mt-swipe>
    </div>

    <!-- ----------left_nav/mask -->
    <div class="mask" @touchstart.self="hideNav()">
      <div class="nav_left">
        <div class="sub_header">
          <div class="sub_tit">
            <img
              src="http://b-ssl.duitang.com/uploads/item/201608/21/20160821230024_MyCYK.thumb.700_0.jpeg"
              alt
            >
            <span class="user_name">皮卡丘</span>
          </div>
        </div>
        <div class="sub_main">
          <span class="iconfont icon-xingxing" @touchstart="showCollection()"></span>
          <span @touchstart="showCollection()">我的收藏</span>
          <span class="iconfont icon-xiazai1"></span>
          <span>离线下载</span>
        </div>
        <div class="sub_footer" @touchstart="hideNav()">
          <span class="iconfont icon-homesel"></span>
          <span class="index">首页</span>
        </div>
      </div>
    </div>

    <!-- ----------main -->
    <!-- <div class="main">
      <div class="newsCard" >
        <h3 class="card_tit">今日热闻</h3>
        <div
          class="card_cont"
          v-for="item in news"
          :key="item.id"
          @touchstart="toNewsCont(item.id)"
        >
          <h2 class="cont_tit">{{item.title}}</h2>
          <img :src="item.images" alt>
        </div>
      </div>
    </div> -->
    <div class="main">
      <div class="newsCard" v-for="(item,index) in news" :key="index">
        <h3 class="card_tit">{{item.title}}</h3>
        <div
          class="card_cont"
          v-for="i in item.data"
          :key="i.id"
          @touchstart="toNewsCont(i.id)"
        >
          <h2 class="cont_tit">{{i.title}}</h2>
          <img :src="i.images" alt>
        </div>
      </div>
    </div>

    
  </div>
</template>

<script type="text/ecmascript-6">
import API from "../../common/js/API";

Date.prototype.getWeek = function() {
  var arr = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六"
  ];
  var day = this.getDay();
  return arr[day];
};
function getDate(num) {
  var date = new Date().getTime();
  //1 params=20190610 title=06月09日 星期日
  var newDate = new Date(date - (num - 1) * 24 * 60 * 60 * 1000);

  var year1 = newDate.getFullYear();
  var month1 =
    newDate.getMonth() + 1 < 10
      ? "0" + (newDate.getMonth() + 1)
      : newDate.getMonth() + 1;
  var day1 =
    newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate();
  var params = year1 + "" + month1 + "" + day1;
  // title
  var newDate2 = new Date(date - num * 24 * 60 * 60 * 1000);
  var month2 =
    newDate2.getMonth() + 1 < 10
      ? "0" + (newDate2.getMonth() + 1)
      : newDate2.getMonth() + 1;
  var day2 =
    newDate2.getDate() < 10 ? "0" + newDate2.getDate() : newDate2.getDate();
  var week = newDate2.getWeek();
  var title = month2 + "月" + day2 + "日" + " " + week;
  return {
    params: params,
    title: title
  };
}
var num = 0;
export default {
  components: {},
  props: {},
  data() {
    return {
      banners: [],
      news: [],
      name:'首页', 
      isload: true,
      time:'',
    };
  },
  watch: {},
  computed: {},
  methods: {
    showNav() {
      var mask = document.querySelector(".mask");
      mask.style.left = 0;
    },
    hideNav() {
      var mask = document.querySelector(".mask");
      mask.style.left = "-100%";
    },
    toNewsCont(id) {
      // console.log(id);
      this.$router.push("/newsDetail/" + id);
    }, // 获取新的数据
    getNewData() {
      if (this.isload) {
        this.isload = false;
        num++;
        this.$http({
          url: API.newsBefore  + getDate(num).params
        }).then(d => {
          this.isload = true;
          this.news.push({
            title: getDate(num).title,
            data: d.data.stories
          });
          // console.log(d);
        });
      }
    },
    showCollection(){
      this.$router.push('/collection')
    },
    
  },
  mounted() {
    var that = this;
    this.$http({
      url: API.news
    }).then(d => {
      //轮播图
      this.banners = d.data.top_stories;
    

      //新闻
       this.news.push({
        title: "今日新闻",
        data: d.data.stories
      });
      this.getNewData();
    });

    //滑到底部
    window.onscroll = function() {
      var wh =
        document.documentElement.clientHeight || document.body.clientHeight; //窗口的高度
      var st = document.documentElement.scrollTop || document.body.scrollTop; //上卷的距离

      var dh =
        document.documentElement.offsetHeight || document.body.offsetHeight; //文档的高度

      if (wh + st + 30 >= dh) {
        // console.log("到底了");
        that.getNewData();
      }

      // 改变顶部
      if (st < 180) {
        that.name = "首页";
      } else {
        var times = document.querySelectorAll(".card_tit");
        for (var i = 0; i < times.length; i++) {
          if (times[i].getBoundingClientRect().top + st < st + wh) {
            that.name = times[i].innerHTML;
          }
        }
      }
    };
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/index.styl';

// ---------------------header
.header {
  position fixed
  left 0
  top 0
  z-index 2
  width 100vw
  height: 1.2rem;
  line-height: 1.2rem;
  font-weight: bold;
  font-size: 0.4rem;
  text-align: left;
  background: #00a2ed;
  padding: 0 0.5rem;
  box-sizing border-box
  color: #ffffff;
  overflow: hidden;

  .left {
    float: left;
    overflow: hidden;

    li {
      float: left;
      margin-right: 0.4rem;

      .iconfont {
        font-size: 0.5rem;
      }
    }
  }

  .right {
    float: right;
    overflow: hidden;

    li {
      float: left;
      margin-right: 0.7rem;

      .iconfont {
        font-size: 0.5rem;
      }
    }

    .last {
      margin-right: 0;
    }
  }
}

// ----------------------------banner
.banner 
  position: relative;
  height: 4rem;
  margin-top 1.2rem

  // border: 1px solid #000000;
  img 
    width: 100vw;
    height: 4rem;
  

  .banner_tit 
    position: absolute;
    left: 0;
    bottom: 0.5rem;
    line-height: 0.5rem;
    font-size: 0.4rem;
    color: #ffffff;
    padding-left: 0.2rem;
  .mint-swipe-indicators
    .is-active
      background #ffffff


// ----------------------nav_aside
.mask {
  z-index: 3;
  position: fixed;
  left: -100%;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);

  .nav_left {
    position: absolute;
    left: 0;
    top: 0;
    // z-index 2
    width: 80%;
    height: 100vh;
    background: #ffffff;
    color: #ffffff;

    .sub_header {
      // position relative
      background: #00a2ed;
      height: 2.4rem;

      .sub_tit {
        padding: 0.2rem;
      }

      img {
        border-radius: 50%;
        border: 1px solid #000000;
        width: 0.6rem;
        height: 0.6rem;
        vertical-align: middle;
      }

      .user_name {
        vertical-align: middle;
        line-height: 0.6rem;
        font-size: 0.3rem;
        padding-left: 0.3rem;
      }
    }

    .sub_main {
      position: absolute;
      left: 0.5rem;
      top: 1.6rem;
      height: 0.5rem;
      line-height: 0.5rem;
      margin-top: 0.1rem;
      font-size: 0.3rem;

      span {
        margin-right: 0.5rem;
      }
    }

    .sub_footer {
      height: 1rem;
      line-height: 1rem;
      background: #f0f0f0;
      color: #00a2ed;

      span {
        margin-left: 0.5rem;
        font-size: 0.35rem;
      }
    }
  }
}

.main {
  background: #f3f3f3;
  text-indent: 1em;
  padding-bottom: 0.5rem;

  .newsCard {
    // padding .3rem
    .card_tit {
      font-size: 0.3rem;
      line-height: 0.9rem;
      height: 0.9rem;
      color: #6f6f6f;
    }

    .card_cont {
      position: relative;
      margin: 0.2rem;
      margin-top: 0;
      box-sizing: border-box;
      padding: 0.3rem;
      height: 2.4rem;
      overflow: hidden;
      background: #ffffff;
      border-radius: 0.2rem;
      box-shadow: 0 0 0.1rem rgba(0, 0, 0, 0.2);

      .cont_tit {
        float: left;
        height: 0.7rem;
        line-height: 0.7rem;
        vertical-align: top;
        font-size: 0.35rem;
        width: 70%;
      }

      img {
        float: left;
        position: absolute;
        right: 0.2rem;
        bottom: 0.2rem;
        height: 2rem;
        width: 2rem;
        vertical-align: top;
      }
    }
  }
}
</style>
