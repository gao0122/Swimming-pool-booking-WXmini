// pages/oneAppt/oneApt.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageURL: getApp().globalData.imageURL,
    coachURL: 'coachButton.png',
    dateURL: 'dateButton.png',
    timeURL: 'timeButton.png',
    name: '高宇超',
    age: '19',
    phone: '13711121349',
    id: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = parseInt(options.id)
    var gd = getApp().globalData
    var that = this
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
        that.setData({
          name: data[id]['childrenName'],
          age: data[id]['childrenAge'],
          phone: data[id]['parentPhone'],
        }) 
        
        wx.request({
          url: gd.serverURL + gd.getApptURL,
          method: 'GET',
          data: {
            'applicationId': data[id]['id'],
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success (res) {
            var data = res.data.result 
            var coach = data['coachId']-1
            var date = data['periodId']
            var time = data['classId'] - 1
            var url = (date - 1) + '' + time
            console.log(url)
            that.setData({
              coachURL: 'coach'+coach+'.png',
              dateURL: 'date'+date+date+'.png',
              timeURL: 'time'+url+'.png',          
            })
          }    
        })
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

  }
})