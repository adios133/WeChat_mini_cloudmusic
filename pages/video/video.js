// pages/video/video.js

// 引入网络请求
import request from '../../utils/request';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoGroupList: [], //to save navbar info
    currentIndex: 0, //to record currentSelect nav item
    currentGroupId: '', //to save currentSelect item id
    videoData: [],
    offset:0,     //to save video list pages
    currentPlayId:'',
    lastPlayList:[],
    isRefresh:false
  },
  //事件处理函数start

  navSwitch(e) {
    /* 绑定事件不能直接在绑定事件中直接传参数，在对象上加上id属性，获取事件对象，再拿到参数*/
    const index = e.currentTarget.id >>> 0 //右移零位，转化为数字，获取的id为数字
    const videoGroupList = this.data.videoGroupList
    this.setData({
      currentIndex: index,
      currentGroupId: videoGroupList[index].id
    },()=> {
      this.setData({
        videoData:[],
        offset:0
      })
      this.getVideoList(this.data.currentGroupId)
    })
    
  },
  // 封装获取分类视频函数
  // 获取列表项对应的视频数据
  getVideoList(id) {
    // 显示加载
    wx.showLoading({
      title: '加载中',
    })
    // 使用const 会变成只读
    let offset = this.data.offset
    
    request('/video/group', {
      id,offset
    }).then(res => {
      if (res.data.code === 301) {
        wx.showToast({
          title: res.data.msg,
          icon:'none'
        })
      }
      const videoData = this.data.videoData
      const data = res.data.datas && res.data.datas.map(item => {
        item.id = 'v' + Math.random()
        return item
      })
      // data[Symbol.isConcatSpreadable] = true;
      // 隐藏加载
      wx.hideLoading()
      this.setData({
        videoData:[...videoData,...data],
        offset:++offset,
        isRefresh:false
      })
    })
  },

  // 上拉加载更多
  getMoreVideo() {
    this.getVideoList(this.data.currentGroupId)
  },

  // 以图片代替视频，当点击显示视频，并播放
  playHandle(e) {
    const id = e.currentTarget.id;
    const lastPlayList = this.data.lastPlayList
    this.setData({
      currentPlayId:id
    });
    this.videoContext = wx.createVideoContext(id);
    const itemTime = lastPlayList.find(item => item.vid === id)
    if(itemTime) {
      this.videoContext.seek(itemTime.time);
    }
    this.videoContext.play() 
  },
  recordTime(e) {
    const playitem = {
      vid:e.currentTarget.id,
      time:e.detail.currentTime
    }
    const lastPlayList = this.data.lastPlayList;
    const item = lastPlayList.find(item=> item.vid === playitem.vid)
    if(item) {
      item.time = playitem.time
    }else {
      lastPlayList.push(playitem)
    }
    this.setData({
      lastPlayList
    })
  },
  playEnd() {
    const {lastPlayList} = this.data
    let cindex
    lastPlayList.forEach((item,index)=> {
      if(item.vid ===this.currentPlayId) {
        cindex = index;
        return
      }
    })
    lastPlayList.splice(cindex,1)
    this.setData({
      lastPlayList
    })
  },

  // 下拉刷新
  pullDown() {
    this.getVideoList(this.data.currentGroupId)
  },
  showShare() {
    wx.showShareMenu({
      withShareTicket: true,
    })
  },


  //事件处理函数end

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取nav列表
    request('/video/group/list').then(res => {
      const result = res.data.data.slice(0, 14)
      this.setData({
        videoGroupList: result,
        currentGroupId:result[0].id
      })
      this.getVideoList(this.data.videoGroupList[0].id)
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
    this.videoContext.pause()
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