// pages/myappt/myappt.js
Page({

  /**
   * 页面的初始数据
   */
  data: {    
    imageURL: getApp().globalData.imageURL,
    users: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var gd = getApp().globalData
    var userId = wx.getStorageSync('userId')

    wx.request({
      url: gd.serverURL + gd.getApptsURL,
      method: 'GET',
      data: {
        'userId': parseInt(userId),
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success (res) {
        var data = res.data.result 
        that.setData({users: data})
        console.log(data)
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

  infoOnClick: function(e) {
    var selection = e.currentTarget.dataset['index']
    wx.navigateTo({
      url: '../oneApt/oneApt?id=' + selection,
    })
  }
})