

// pages/login/login.js

// 引入网络请求封装
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    password:''
  },


  // 登录功能start
  // 1.收集表单数据
  getFormData(e) {
    let type = e.currentTarget.id;
    this.setData({
      [type]:e.detail.value.trim()
    })

  },
  logIn() {
    // 前端验证验证手机号和密码是否符合规则
    const phoneReg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    const passwordReg = /^[a-zA-Z]\w{5,17}$/;
    const phone = this.data.phone;
    const password = this.data.password;
    if(!phoneReg.test(phone)) {
      wx.showToast({
        title: '手机格式不正确',
        icon:'none'
      })
    }else if(!passwordReg.test(password)){
      wx.showToast({
        title: '密码格式不正确',
        icon:'none'
      })
    }else {
      // 验证通过，发送请求，后端验证
      request('/login/cellphone',{phone,password,isLogin:true},"POST").then(res=> {
        if(res.data.code === 200) {
          wx.setStorageSync('userInfo', JSON.stringify(res.data.profile))
          wx.showToast({
            title:'登陆成功',
            duration:1000
          })
          // 返回到个人中心页面
          // relaunch关闭所有页面，打开到应用内的某个页面
          wx.reLaunch({
            url: '/pages/profile/profile',
          })
        }
        if(res.data.code === 502) {
          wx.showToast({
            title: res.data.message,
            icon:'none'
          })
        }
        if(res.data.code === 400) {
          wx.showToast({
            title: '手机号错误',
            icon:'none'
          })
        }
      })
    }
   
    
  },





  // 登录功能end


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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