// pages/infos/infos.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

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

  },

  bindHideKeyboard: function (e) {
    if (e.detail.value.length === 11) {
      // 收起键盘
      wx.hideKeyboard()
    }
  },
  bindNextKeyboard: function (e) {
    if (e.detail.value.length === 11) {
      // 收起键盘
      
    }
  },

  save: function(e) {
    wx.showLoading({
      title: '支付中...',
    })
    var infos = e.detail.value
    var gd = getApp().globalData
    var that = this
    var userId = wx.getStorageSync('userId')
    console.log(userId)
    wx.request({
      url: gd.serverURL + gd.orderURL,
      method: 'POST',
      header: {
        "content-type": "application/json",
      },
      data: {
        "childrenAge": parseInt(infos['age']),
        "childrenName": infos['itsname'],
        "phone": infos['phone'],
        "scheduleId": gd.classId,
        "cost": 100,
        "userId": userId,
      },
      success (res) {
        console.log(res.data);
        that.sign(res.data.prepay_id)
        wx.hideLoading()
      },
      fail(res) {
        console.log(res)
      }
    })

  },

  sign: function (prepay_id) {
    var that = this
    var gd = getApp().globalData
    wx.request({
      url: gd.serverURL + gd.signURL,
      method: "POST",
      header: {
        "content-type": "application/x-www-form-urlencoded",
      },
      data: {
        repay_id: prepay_id,
      },
      success (res) {
        that.requestPayment(res.data)
      }
    })
  },

  requestPayment: function (obj) {
    var that = this
    wx.requestPayment({
      timeStamp: obj.timeStamp,
      nonceStr: obj.nonceStr,
      package: obj.package,
      signType: obj.signType,
      paySign: obj.paySign,
      success: function (res) {
        wx.redirectTo({
          url: '../myappt/myappt',
        });
      },
      fail: function (res) {},
    })

  
  },

})