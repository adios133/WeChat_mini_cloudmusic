// pages/recommend/recommend.js

import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    day:1,
    month:1,
    songList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 请求数据
    request('/recommend/songs').then(res=> {
      this.setData({
        songList:res.data.recommend
      })
    })
    // 格式化时间
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    this.setData({
      day:this.padLeftZero(day.toString()),
      month:this.padLeftZero(month.toString())
    })

  },
  padLeftZero (str) {
    return ('00' + str).substr(str.length);
  },
  playSong(e) {
    const id = e.currentTarget.id
    wx.redirectTo({
      url: '/pages/playing/playing?id=' + id,

    })
  },
    

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