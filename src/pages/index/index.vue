<template>
  <div>
    <!-- 搜索 -->
    <div class="search">
      <!-- 搜索框 -->
      <div class="input-box">
        <input type="text" placeholder="搜索">
      </div>
      <!-- 搜索结果-即点击输入框后出现的搜索历史等提示 -->
      <div class="result"></div>
    </div>
    <!-- 轮播图 -->
    <swiper class="banner" autoplay="true" indicator-dots
      indicator-color="rgba(200,200,200,0.6)"
      indicator-active-color="rgba(255,255,255)"
      circular>
      <swiper-item v-for="(item, index) in bannerList" :key="index">
        <navigator :url="item.navigator_url">
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>

    <!-- 导航 -->
    <div class="navs">
      <navigator>
        <image src="/static/uploads/icon_index_nav_1@2x.png"></image>
      </navigator>
      <navigator>
        <image src="/static/uploads/icon_index_nav_2@2x.png"></image>
      </navigator>
      <navigator>
        <image src="/static/uploads/icon_index_nav_3@2x.png"></image>
      </navigator>
      <navigator>
        <image src="/static/uploads/icon_index_nav_4@2x.png"></image>
      </navigator>
    </div>
    <!-- 楼层 -->
    <div class="floors">
      <div class="floor">
        <!-- 标题 -->
        <div class="title">
          <image src="/static/uploads/pic_floor01_title.png"></image>
        </div>
        <div class="pics">
          <image src="/static/uploads/pic_floor02_1@2x.png"></image>
          <image src="/static/uploads/pic_floor02_2@2x.png"></image>
          <image src="/static/uploads/pic_floor02_3@2x.png"></image>
          <image src="/static/uploads/pic_floor02_4@2x.png"></image>
          <image src="/static/uploads/pic_floor02_5@2x.png"></image>
        </div>
      </div>
      <div class="floor">
        <!-- 标题 -->
        <div class="title">
          <image src="/static/uploads/pic_floor01_title.png"></image>
        </div>
        <div class="pics">
          <image src="/static/uploads/pic_floor02_1@2x.png"></image>
          <image src="/static/uploads/pic_floor02_2@2x.png"></image>
          <image src="/static/uploads/pic_floor02_3@2x.png"></image>
          <image src="/static/uploads/pic_floor02_4@2x.png"></image>
          <image src="/static/uploads/pic_floor02_5@2x.png"></image>
        </div>
      </div>
    </div>
    <span class="goTop" v-show="!isTop" @click="backTop">回到顶部</span>
  </div>
</template>

<script>
import request from '@/utils/request.js'
export default {
  data () {
    return {
      bannerList: [],
      isTop: true
    }
  },
  mounted () {
    console.log('这里可以请求数据。。。。')
    this.getBanner()
  },

  methods: {
    async getBanner () {
      // 小程序中所有API接口再mpvue中使用mpvue作为命名空间
      // 即把原来的wx.xxx 改为 mpvue.xxxx
      // eg.  wx.request 变为 mpvue.request
      // 所需要的参数保持不变
      // 轮播图请求
      // 原始写法
      // let _this = this
      // mpvue.request({
      //   url: 'https://www.zhengzhicheng.cn/api/public/v1/home/swiperdata',
      //   methods: 'get',
      //   success: function (info) {
      //     _this.bannerList = info.data.message
      //     console.log(_this.bannerList)
      //   }
      // })

      // async await 写法
      let {message} = await request('https://www.zhengzhicheng.cn/api/public/v1/home/swiperdata')
      this.bannerList = message
    },
    // 点击回到顶部的函数
    backTop () {
      mpvue.pageScrollTo({
        scrollTop: 0,
        duration: 300
      })
    }
  },

  created () {
    // let app = getApp()
  },
  onPullDownRefresh () {
    console.log('下拉操作设置')
    // 将首页接口重新发请求
    this.getBanner()
    // 请求完成后，停止下拉刷新动态效果
    mpvue.stopPullDownRefresh()
  },
  onReachBottom () {
    // 完成上拉加载更多任务的效果
  },
  // 回到顶部时使用的 页面滚动 方法
  onPageScroll (ev) {
    this.isTop = ev.scrollTop < 50
  }
}
</script>

<style scoped>
/* // .search {
//   .input-box {
//     padding: 21rpx 30rpx;
//     background: #ea4451;
//   }
  
// } */
.search .input-box{
  padding: 21rpx 30rpx;
  background: #ea4451;
}
.search .input-box input {
  background: #fff;
  height: 60rpx;
  border-radius: 10rpx;
  font-size: 24rpx;
  color: #666;
  padding: 0 20rpx;
}
.banner {
  width: 750rpx;
  height: 340rpx;
}
.banner navigator{
  width: 100%;
  height: 100%;
}
.navs {
  display: flex;
  padding: 30rpx 42rpx;
  justify-content: space-between;
}
.navs navigator{
  width: 128rpx;
  height: 140rpx;
}
.floor .title {
  width:750rpx;
  height: 60rpx;
  background: #f4f4f4;
  padding:24rpx;
}
.floor .pics {
  padding: 15rpx;
}
.pics {
  overflow: hidden;
}
.pics image {
  width: 232rpx;
  height: 188rpx;
  float: left;
  margin-right:10rpx;
}
.pics image:first-child {
  height: 386rpx;
}
.pics image:last-child {
  margin-right: 0rpx;
}
.pics image:nth-child(3) {
  margin-right: 0rpx;
}
.goTop {
  position: fixed;
  bottom: 70rpx;
  right: 30rpx;
  width: 88rpx;
  height: 88rpx;
  background: rgba(255, 255,255,0.6);
  border-radius: 50%;
}
</style>
