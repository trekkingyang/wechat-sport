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
    this.count()
  },
  data: {
    stage: 'ready', // ready, warmup, work, strech, end
    status: 'ready', // 0: rest, 1: work
    flag: 0,
    pause: false,
    duration: 5,
    imgUrl: '/images/test/sport1.jpeg',
    picList: [
      {
        imgUrl: '/images/test/sport1.jpeg',
        duration: 10,
        rest: 5,
        stage: 'warmup'
      },
      {
        imgUrl: '/images/test/sport2.jpeg',
        duration: 10,
        rest: 5,
        stage: 'warmup'
      },
      {
        imgUrl: '/images/test/sport1.jpeg',
        duration: 10,
        rest: 5,
        stage: 'work'
      },
      {
        imgUrl: '/images/test/sport2.jpeg',
        duration: 10,
        rest: 5,
        stage: 'work'
      },
      {
        imgUrl: '/images/test/sport1.jpeg',
        duration: 10,
        rest: 5,
        stage: 'strech'
      },
      {
        imgUrl: '/images/test/sport2.jpeg',
        duration: 10,
        rest: 5,
        stage: 'strech'
      },
    ]
  },
  /** 
   * 下一动作
  */
  nextStep() {

  },
  /**
   * 上一动作
   */
  preStep() {

  },
  /**
   * 计时
   */
  count() {
    this.data.intervarID = setInterval(() => {
      if (this.data.duration > 0) {
        this.data.duration--
      }
      this.setData({
        duration: this.data.duration
      })
      
      if (this.data.duration <= 0) {
        this.next()
      }
    },1000);
  },
  /**
   * 计时到0之后接下来到动作
   */
  next() {
    if (this.data.stage === 'ready') {
      this.setData({
        stage: 'warmup'
      })
    }
    if (this.data.status === 'ready') {
      this.data.duration = this.data.picList[this.data.flag].duration
      this.data.status = 'work'
      this.setData({
        imgUrl: this.data.picList[this.data.flag].imgUrl
      })
      return
    } else if (this.data.status === 'work') {
      this.data.duration = this.data.picList[this.data.flag].rest
      this.data.status = 'test'
      return
    } else if (this.data.status === 'test') {
      this.data.flag++
      if (this.data.flag >= this.data.picList.length) {
        this.stop()
        return
      }
      let preStage = this.data.stage
      this.data.stage = this.data.picList[this.data.flag].stage
      this.setData({
        stage: this.data.stage
      })
      // 在热身和运动完之后有2分钟的休息时间
      if (preStage !== this.data.stage && preStage !== 'ready' && preStage !== 'strech' && preStage !== 'halftime') {
        this.data.duration = 10
        this.setData({
          stage: 'halftime'
        })
        this.data.status = 'ready'
        return
      } else {
        this.data.duration = this.data.picList[this.data.flag].duration
        this.data.status = 'work'
        this.setData({
          imgUrl: this.data.picList[this.data.flag].imgUrl
        })
        return
      }
    }
  },
  stop() {
    clearInterval(this.intervarID)
  },
  pause() {
    this.data.pause = !this.data.pause
    this.data.pause ? clearInterval(this.data.intervarID) : this.count()
  }
})