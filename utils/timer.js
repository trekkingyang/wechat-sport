var wxTimer = function (initObj){
  initObj = initObj || {};
  this.duration = initObj.duration || 40
	this.interval = initObj.interval || 1;				//间隔时间
	this.complete = initObj.complete;					//结束任务
	this.intervalFn = initObj.intervalFn;				//间隔任务
  this.name = initObj.name;							//当前计时器在计时器数组对象中的名字
  this.pause = false

	this.intervarID;									//计时ID
}

wxTimer.prototype = {
  start: function (self) {
    var that = this
    //开始计时
    var count = that.duration
    function begin() {
      self.setData({
        wxTimer: count--
      });
      //时间间隔执行函数
      if( 0 == (count-1) % that.interval && that.intervalFn){
        that.intervalFn();
      }
      //结束执行函数
      if(wxTimerSecond <= 0){
        if(that.complete){
            that.complete();
        }
        that.stop();
      }
    }
    begin();
    this.intervarID = setInterval(begin,1000);
  },
  stop: function() {
    clearInterval(this.intervarID)
  },
  pause: function(obj) {
    this.pause = !this.pause
    this.pause ? this.start(obj) : clearInterval(this.intervarID)
  }
}
module.exports = wxTimer;
