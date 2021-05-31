// pages/time/time.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    left: [],//['余10位', '余10位', '余10位', '余10位', '余10位', '余10位', '余10位', '余10位'],
    dateI: 0,
    times: null,
    imageURL: getApp().globalData.imageURL,

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
    var that = this
    var gd = getApp().globalData
    this.setData({'dateI': gd.date-1})
    console.log(this.data.dateI)
    console.log(this.data.left)
    console.log(gd.coach)
    console.log(gd.date)
    wx.request({
      url: gd.serverURL + gd.leftURL,
      method: 'GET',
      data: {
        'coachId': parseInt(gd.coach),
        'periodId': parseInt(gd.date),
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success (res) {
        var timeData = res.data.result 
        console.log(timeData)
        var lefts = []
        for (var i = 0; i < 8; i++) {
          var place = timeData[i]['places']
  
          if (parseInt(place) == 0) {
            lefts[i] = '满班'
          } else {
            lefts[i] = '余' + place + '位'
          }
        }
        that.setData({left: lefts})
        that.setData({times: timeData})
      },
      fail (res) {
        
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

  selected: function(e) {
    var selection = e.currentTarget.dataset['index']
    var select = parseInt(selection)
    getApp().globalData.time = parseInt(selection)
    console.log(this.data.times)
    getApp().globalData.classId = this.data.times[select - 1]['id']
    if (this.data.times[select - 1]['places'] == '0') {
      wx.showToast({
        title: '此班已满员，请联系客服或选择其他时间',
        duration: 1349,
      })
    } else {
      wx.navigateBack({
        url: '../appt/appt',
      })
    }
  }
})