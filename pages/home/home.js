
// pages/home.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    authLogin: false,
    avatarUrl: 'user-unlogin.png',
    imageURL: getApp().globalData.imageURL,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    // 查看是否授权

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
    var that = this    
    wx.getSetting({
      success (res){
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              app.globalData.userInfo = res.userInfo
              console.log(res.userInfo)
              that.setData({
                userInfo: res.userInfo,
              })
            }
          })
          that.onGetUserInfo()
        }
      }
    })
  
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

  },

  onGetUserInfo: function(e) {
    var that = this
    var gd = getApp().globalData
    wx.login({
      success (res) {
        if (res) {
          var code = res.code
          wx.getUserInfo({
            success: function(res) {
              wx.showLoading({
                title: '登录中',
              })
              try {
                wx.setStorageSync('userInfo', res.userInfo)
              } catch (e) {
                console.error(e)
              }
              gd.userInfo = res.userInfo
              that.setData({
                userInfo: res.userInfo,
              })
              wx.request({
                url: gd.serverURL + gd.loginURL, 
                method: 'post',
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                data: {
                  encryptedData: res.encryptedData,//用户敏感信息
                  iv: res.iv,//解密算法的向量
                  code: code,//临时登录凭证
                  rawData: res.rawData, //用户非敏感信息
                  signature: res.signature, //签名
                },
                dataType: JSON,
                success: function (res) {
                  console.log(res);
                  var data = JSON.parse(res.data);
                  if (data.message == 'success') {
                    that.setData(data.result)
                    console.log('----' + data.result['userId']);
                    wx.setStorageSync("authLogin", true);
                    wx.setStorageSync("userId", data.result['userId']);
                  } else {
                    console.log('解密失败!!!');
                  }
                  wx.hideLoading()
                },
                fail: function (e) {
                  wx.hideLoading();
                  console.log(e)
                }
              })
            }
          })
        } else {
          wx.hideLoading()
          console.log('登录失败！' + res.errMsg)
        }
      }
    })

  },

  getUserInfo: function(e) {
    getApp().globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  orderNow: function() {
    wx.redirectTo({
      url: '../appt/appt',
    })
  },

  myOrder: function() {
    wx.redirectTo({
      url: '../myappt/myappt',
    })
  },

  serviceTap: function() {
    
  }
})