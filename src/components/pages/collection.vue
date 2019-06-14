<template>
  <div class="wrapper">
    <!-- ----------header -->
    <div class="header">
      <ul class="left">
        <li @touchstart="showNav()">
          <span class="iconfont icon-gengduo1"></span>
        </li>
        <li>
          <span>{{arr.length}}条收藏</span>
        </li>
      </ul>
    </div>

    <!-- ----------mask -->
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
          <span class="iconfont icon-xingxing" @touchstart="hideNav()"></span>
          <span @touchstart="hideNav()">我的收藏</span>
          <span class="iconfont icon-xiazai1"></span>
          <span>离线下载</span>
        </div>
        <div class="sub_footer" @touchstart="toIndex()">
          <span class="iconfont icon-homesel"></span>
          <span class="index">首页</span>
        </div>
      </div>
    </div>

    <!-- ------- 收藏列表 -------- -->
    <div class="card_wrap">
        <div class="card_cont" v-for="item in arr" :key="item.id" @touchstart="toNewsCont(item.id)">
      <h2 class="cont_tit">{{item.title}}</h2>
      <img :src="item.images" alt>
    </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  components: {},
  props: {},
  data() {
    return {
      arr: []
    };
  },
  watch: {},
  computed: {},
  methods: {
    toNewsCont(id) {
      // console.log(id);
      this.$router.push("/newsDetail/" + id);
    },

    showNav() {
      var mask = document.querySelector(".mask");
      mask.style.left = 0;
    },
    hideNav() {
      var mask = document.querySelector(".mask");
      mask.style.left = "-100%";
    },
    toIndex() {
      this.$router.push("/index");
    }
  },
  mounted() {
    this.arr = JSON.parse(localStorage.getItem("arr"));
    // console.log(this.arr);
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/index.styl';

// ---------------------header
.header {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2;
  width: 100vw;
  height: 1.2rem;
  line-height: 1.2rem;
  font-weight: bold;
  font-size: 0.4rem;
  text-align: left;
  background: #00a2ed;
  padding: 0 0.5rem;
  box-sizing: border-box;
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
}

.card_wrap
  margin-top: 1.4rem;
   
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
</style>
