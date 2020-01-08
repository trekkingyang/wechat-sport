Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      pagePath: "/index/index",
      iconPath: "/images/image/icon_component.png",
      selectedIconPath: "/images/image/icon_component_HL.png",
      text: "组件"
    }, {
      pagePath: "/workout/index",
        iconPath: "/images/image/icon_API.png",
        selectedIconPath: "/images/image/icon_API_HL.png",
      text: "接口"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({
        url: url,  
        success: function (e) {  
          var page = getCurrentPages().pop();  
          if (page == undefined || page == null) return;  
          page.onLoad();  
        }
      })
      console.log(url)
      this.setData({
        selected: data.index
      })
    }
  }
})