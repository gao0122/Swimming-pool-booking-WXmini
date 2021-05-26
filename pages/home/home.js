// pages/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authLogin: false,
    avatarUrl: '/images/user-unlogin.png',
    nickname: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    // 查看是否授权
    var that = this
    wx.getSetting({
      success (res){
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              that.setData({
                avatarUrl: res.userInfo.avatarUrl,
                nickName: res.userInfo.nickName,
              })
            }
          })
        }
      }
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

  },

  onGetUserInfo: function(e) {
    var that = this
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
                wx.setStorageSync('userInfo', e.detail.userInfo)
              } catch (e) {
                console.error(e)
              }
              wx.request({
                url: 'https://www.bakesf.com/BakeSmallWXBackEnd/swimming/login',
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
                    that.setData({
                      authLogin: true
                    })
                    wx.setStorageSync("authLogin", true);
                    console.log(data.result);
                    // wx.setStorageSync("userId", data.result.voterId);
                    // wx.setStorageSync("userToken", data.result.voterToken);
                  } else {
                    console.log('解密失败!!!');
                  }
                  wx.hideLoading()
                },
                fail: function (e) {
                  wx.hideLoading();
                  console.log('系统错误' + e.message)
                }
              })

              // console.log(userInfo)
              // that.setData({
              //   nickname: userInfo.nickName,
              //   avatarUrl: userInfo.avatarUrl,
              // })
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
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
})