//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    workNum: 500,
    commentNum: 1000,
    dataList: [
      {
        title: 'Burbee',
        imgUrl: '/images/test/sport1.jpeg',
        avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJ0Rg2eaLHtE7BwLBEXJmQGYMgdXSTSftp1T2g4effCesTM4pr6GfyCKc8YAnTSAjGiaH3gqU4zUcA/132',
        nickname: '杨洋',
        workNum: 50,
        commentNum: 2000,
      },
      {
        title: 'Burbee',
        imgUrl: '/images/test/sport2.jpeg',
        avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJ0Rg2eaLHtE7BwLBEXJmQGYMgdXSTSftp1T2g4effCesTM4pr6GfyCKc8YAnTSAjGiaH3gqU4zUcA/132',
        nickname: '杨洋',
        workNum: 50,
        commentNum: 2000,
      }
    ]
  },
  //事件处理函数
  tapToWork: function (e) {
    wx.navigateTo({
      url: '/pages/practice/index?id=11',
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
      }
    })
  },
  onLoad: function () {
    wx.getSetting({

      success: res => {
  
          if (res.authSetting['scope.userInfo']) {
  
              wx.getUserInfo({
  
                  success: res => {
  
                      console.log(res)
  
                  }
  
              })
  
          }
  
      },
  
  })
    if (app.globalData.userInfo) {
      console.log(app.globalData.userInfo)
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log(res.userInfo)

        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          console.log(app.globalData.userInfo)
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
