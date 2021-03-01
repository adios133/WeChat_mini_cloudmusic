// pages/index/index.js

// 
import request from "../../utils/request"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: [],
    recommendList: [],
    rankList: []
  },
  // 点击每日推荐进入页面
  getRecommend() {
    wx.redirectTo({
      url: '/pages/recommend/recommend',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 1.发送网络请求，请求轮播图数据
    request('/banner', {
      type: 2
    }).then(res => {
      this.setData({
        banner: res.data.banners
      })
    })

    // 2.请求推荐歌单数据
    request('/personalized', {
      limit: 12
    }).then(res => {
      this.setData({
        recommendList: res.data.result
      })
    })
    // 3.请求排行榜数据
    let i = 0
    const resArr = []
    while (i < 4) {
      request('/top/list', {
        idx: i++
      }).then(res => {

        const obj = {
          name: res.data.playlist.name,
          list: res.data.playlist.tracks.slice(0, 3)
        }
        resArr.push(obj)
        this.setData({
          rankList: resArr
        })
      })
    }
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