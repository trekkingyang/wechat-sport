Page({
  onLoad: function (option) {
    console.log(option.query)
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('acceptDataFromOpenedPage', { data: 'test' });
    eventChannel.emit('someEvent', { data: 'test' });
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      console.log(data)
    })
    wx.setNavigationBarTitle({title: 'VIPR能量桶'})
  },
  data: {
    detail: {
      name: 'VIPR能量桶',
      id: '11111',
      imgUrl: '/images/test/sport1.jpeg',
      time: '60',
      difficult: 'easy',
      desc: '很好的课程'
    }
  }
})