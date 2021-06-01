// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

  },
  globalData: {
    imageURL: 'https://huolue-images.oss-cn-shenzhen.aliyuncs.com/images/',
    serverURL: "https://www.bakesf.com/BakeSmallWXBackEnd/swimming/",
    loginURL: "login",
    dateURL: "getPeriodByUserId",
    timeURL: "getScheduleByPeriodId",
    orderURL: "getOrderPre", 
    signURL: "getSign",
    payURL: "payCallback",
    leftURL: "getPlace",
    getApptsURL: "getApplicationForm",
    getApptURL: "getDetail",
    userInfo: null,
    coach: 0,
    date: 0,
    time: 0,
    one: 0,
    classId: 0,
    age: '',
    name: '',
    phone: '',
  }
})
