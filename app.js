// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    var that = this
    wx.getUserInfo({
      success: function (res) {
        that.globalData.userInfo = res.userInfo
        //console.log(that.globalData.userInfo)
      },
      fail: function () {
     }
    })

  },
  globalData: {
    serverURL: 'http://192.168.10.109:8300/swimming/',//"https://www.bakesf.com/BakeSmallWXBackEnd/swimming/",
    loginURL: "login",
    dateURL: "getPeriodByUserId",
    timeURL: "getScheduleByPeriodId",
    orderURL: "getOrderPre", 
    signURL: "getSign",
    payURL: "payCallback",
    leftURL: "getPlace",
    userInfo: null,
    coach: 0,
    date: 0,
    time: 0,
    one: 0,
    classId: 0,
    name: '',
    phone: '',
    coachTime: [],
  }
})
