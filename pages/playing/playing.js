// pages/playing/playing.js

//引入请求js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    song: {},
    songUrl: {},
    isPlaying: false,
    total:'00:00',
    currentTime:'00:00',
    width:0
  },

  // 功能函数区 start

  // 获取音乐详情
  getSongDetail(ids) {
    request('/song/detail', {ids}).then(res => {
      this.setData({
        song: res.data.songs[0],
        total:this.totalTime(res.data.songs[0].dt)
      })
      this.getPlayUrl(this.data.song.id)
    })
  },

  // 获取音乐播放地址
  getPlayUrl(id) {
    request('/song/url', {
      id
    }).then(res => {
      this.setData({
        songUrl: res.data.data[0]
      })
      this.BackgroundAudioManager = wx.getBackgroundAudioManager()
      this.BackgroundAudioManager.onPause(() => {
        this.setData({
          isPlaying: false
        })
      })
      this.BackgroundAudioManager.onPlay(() => {
        this.setData({
          isPlaying: true
        })
      })
      
      this.musicControll()
    })

  },


  // 音乐控制模块
  musicControll() {
    const isPlaying = this.data.isPlaying
    this.setData({
      isPlaying: !isPlaying
    })
    if (this.data.isPlaying) {
      this.BackgroundAudioManager.src = this.data.songUrl.url
      this.BackgroundAudioManager.title = this.data.song.name
    } else {
      this.BackgroundAudioManager.pause()
    }
    this.BackgroundAudioManager.onTimeUpdate(()=> {
      const width = (this.BackgroundAudioManager.currentTime / this.BackgroundAudioManager.duration ) * 100
      this.setData( {
      currentTime:this.currentTime(this.BackgroundAudioManager.currentTime),
      width
      })
      // console.log(this.BackgroundAudioManager.currentTime);
      // console.log(this.BackgroundAudioManager.duration);
    })
    this.BackgroundAudioManager.onEnded(()=> {
      // 播放下一首，目前是停止播放
      this.setData({
        isPlaying:false
      })
    })
  },
  

  // 时间转化
  totalTime(time) {
    const seconds = Math.round(time/1000)
    const minute = Math.floor(seconds/60)
    const second = Math.round(seconds - minute * 60)
    const m = this.padLeftZero(minute.toString())
    const s = this.padLeftZero(second.toString())
    return  m + ':' + s
  },
  currentTime(time) {
    const minute = Math.floor(time/60)
    const second = Math.round(time - minute * 60)
    const m = this.padLeftZero(minute.toString())
    const s = this.padLeftZero(second.toString())
    return  m + ':' + s
  },
  padLeftZero (str) {
    return ('00' + str).substr(str.length);
  },





  // 功能函数 end

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id;
    this.setData({
      id,
    });
    this.getSongDetail(this.data.id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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