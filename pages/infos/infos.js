// pages/infos/infos.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageURL: getApp().globalData.imageURL,
    name: getApp().globalData.name,
    phone: getApp().globalData.phone,
    age: getApp().globalData.age,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      name: getApp().globalData.name,
      phone: getApp().globalData.phone,
      age: getApp().globalData.age,  
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

  bindHideKeyboard: function (e) {
    if (e.detail.value.length === 11) {
      getApp().globalData.phone = e.detail.value
      wx.hideKeyboard()
    }
  },
  bindNameKeyboard: function (e) {
    getApp().globalData.name = e.detail.value
  },

  bindAgeKeyboard: function (e) {
    getApp().globalData.age = e.detail.value
  },

  save: function(e) {
    var infos = e.detail.value
    if (infos['itsname'].length == 0) {
      wx.showToast({
        title: '请填写姓名',
      })
      return
    }
    if (infos['age'].length == 0) {
      wx.showToast({
        title: '请填写年龄',
      })
      return
    }
    if (infos['phone'].length == 0) {
      wx.showToast({
        title: '请填写手机号码',
      })
      return
    }
    wx.showLoading({
      title: '支付中...',
    })
    var gd = getApp().globalData
    var that = this
    var userId = wx.getStorageSync('userId')
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
      },
      fail (res) {
        console.log(res)
      }
    })
  },

  requestPayment: function (obj) {
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
      fail: function (res) {
        console.log(res)
      },
    })

  
  },

})