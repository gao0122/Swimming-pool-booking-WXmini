// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    serverURL: "https://www.bakesf.com/BakeSmallWXBackEnd/swimming/",
    loginURL: "login",
    dateURL: "getPeriodByUserId",
    timeURL: "getScheduleByPeriodId",
    orderURL: "getOrderPre", 
    payURL: "payCallback",
    userInfo: null,
    coach: 0,
    date: 0,
    time: 0,
    one: 0,
    name: '',
    phone: '',
    coachTime: [],
  }
})
