// pages/profile/profile.js

let startY = 0;
let moveY = 0;
let distanceY = 0;

// 引入请求函数
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moveDistance: 'translateY(0)',
    animationY: '',
    userInfo: null,
    recentPlay:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 只会执行一次，由于使用navigateTo跳转，所以使用relaunch重新加载页面，才会得到数据

    const userInfo = wx.getStorageSync('userInfo') ? JSON.parse(wx.getStorageSync('userInfo')) : null;
    this.setData({
      userInfo
    })
    // 请求最近播放记录
    if (userInfo) {
      const {userId} = userInfo;
      let index = 0
      request('/user/record',{uid:userId,type:1}).then(res=> {
        this.setData( {
          recentPlay:res.data.weekData.slice(0,12).map(item=>{
            item.id = 'm'+index++;
            return item
          })
        })
      })
    }
  },


  // 事件处理部分start

  // 滑动事件
  startHandle(e) {
    startY = e.touches[0].pageY;
    this.setData({
      animationY: ''
    })
  },
  moveHandle(e) {
    moveY = e.touches[0].pageY;
    distanceY = moveY - startY;
    /*
    只允许向下滑动，请滑动距离有限制
    */
    distanceY = distanceY < 0 ? 0 : distanceY;
    distanceY = distanceY > 80 ? 80 : distanceY;
    this.setData({
      moveDistance: `translateY(${distanceY}rpx)`
    })
  },
  endHandle() {
    this.setData({
      moveDistance: 'transform:translateY',
      animationY: 'transform .5s ease-out'
    })
  },

  // 登陆事件
  userLogin() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },

  // 
  playSong(e) {
    const id = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/playing/playing?id=' + id,
    })
  },




  // 事件处理部分end

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})