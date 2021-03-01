
/*
封装ajax请求
*/
// 导入服务器请求地址
import URL  from './baseURL'
export default (url, data, method = "GET") => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: URL.baseURL + url,
      data,
      method,
      header:{
        cookie: wx.getStorageSync('cookie') ? wx.getStorageSync('cookie').find(item=>item.indexOf('MUSIC_U')!== -1) : ''
      },
      success: (res) => {
        if(url.indexOf('/login/cellphone') !== -1) {
          wx.setStorageSync('cookie', res.cookies)
        }
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    });
  })

}
