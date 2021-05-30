
Page({

  data: {
    coachURL: '/images/coachButton.png',
    dateURL: '/images/dateButton.png',
    timeURL: '/images/timeButton.png',

  },

  onShareAppMessage() {
    return {
      title: '游泳报名',
      path: 'page/component/pages/appt/appt',
      
    }
  },

  onLoad: function(option) {
    
  },
  
  onShow: function () {
    this.reloadit()
  },

  coachOnClick: function() {
    wx.navigateTo({
      url: '../coach/coach',
    })
  },

  dateOnClick: function() {
    wx.navigateTo({
      url: '../session/session',
    })
  },

  timeOnClick: function() {
    var date = getApp().globalData.date
    var coach = getApp().globalData.coach
    console.log(date, coach)
    if (date > 0) {
      if (coach > 0) {
        if (date < 5) {
          wx.navigateTo({
            url: '../time/time',
          })  
        } else {
          wx.navigateTo({
            url: '../one/one',
          })
        }
      } else {
        wx.showToast({
          title: '请先选择教练',
          duration: 1349,
        })
      }
    } else {
      wx.showToast({
        title: '请选择培训日期',
        duration: 1349,
      })
    }

  },

  infoOnClick: function() {
    var gd = getApp().globalData
    if (gd.coach == 0) {
      wx.showToast({
        title: '请先选择教练',
        duration: 1349,
      })
      return
    }
    if (gd.date == 0) {
      wx.showToast({
        title: '请选择培训日期',
        duration: 1349,
      })
      return
    }
    if (gd.time == 0 || gd.date == 5 && gd.one == 0) {
      wx.showToast({
        title: '请选择培训时间',
        duration: 1349,
      })
      return
    }

    wx.navigateTo({
      url: '../infos/infos',
    })
  },

  reloadit: function() {
    var gd = getApp().globalData
    switch (gd.coach) {
      case 0:
        this.setData({coachURL: '/images/coachButton.png'})
        break
      case 1:
        this.setData({coachURL: '/images/coach0.png'})
        break
      case 2:
        this.setData({coachURL: '/images/coach1.png'})
        break
      case 3:
        this.setData({coachURL: '/images/coach2.png'})
        break
      case 4:
        this.setData({coachURL: '/images/coach3.png'})
        break
    }

    switch (gd.date) {
      case 0:
        this.setData({dateURL: '/images/dateButton.png'})
        break
      case 1:
        this.setData({dateURL: '/images/date11.png'})
        break
      case 2:
        this.setData({dateURL: '/images/date22.png'})
        break
      case 3:
        this.setData({dateURL: '/images/date33.png'})
        break
      case 4:
        this.setData({dateURL: '/images/date44.png'})
        break
      case 5:
        this.setData({dateURL: '/images/date01.png'})
        this.setData({timeURL: '/images/timeOne.png'})
        break
     }
    if (gd.date < 5) {
      switch (gd.time) {
        case 0:
          this.setData({timeURL: '/images/timeButton.png'})
          break
        case 1:
          this.setData({timeURL: '/images/time'+(gd.date-1)+'0.png'})
          break
        case 2:
          this.setData({timeURL: '/images/time'+(gd.date-1)+'1.png'})
          break
        case 3:
          this.setData({timeURL: '/images/time'+(gd.date-1)+'2.png'})
          break
        case 4:
          this.setData({timeURL: '/images/time'+(gd.date-1)+'3.png'})
          break
        case 5:
          this.setData({timeURL: '/images/time'+(gd.date-1)+'4.png'})
          break
        case 6:
          this.setData({timeURL: '/images/time'+(gd.date-1)+'5.png'})
          break
        case 7:
          this.setData({timeURL: '/images/time'+(gd.date-1)+'6.png'})
          break
      }
    } else {
      switch (gd.one) {
        case 1:
          this.setData({timeURL: '/images/time40.png'})
          break
        case 2:
          this.setData({timeURL: '/images/time41.png'})
          break
        case 3:
          this.setData({timeURL: '/images/time42.png'})
          break
      }
    }
  }, 



})