function getRandomColor () {
  let rgb = []
  for (let i = 0 ; i < 3; ++i){
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}

Page({
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  inputValue: '',
    data: {
      scrollHeight:0,
        src: '',
    danmuList: [
      {
        text: '第 1s 出现的弹幕',
        color: '#ff0000',
        time: 1
      },
      {
        text: '第 3s 出现的弹幕',
        color: '#ff00ff',
        time: 3
    }],
    dataList:{}
    },
  bindInputBlur: function(e) {
    this.inputValue = e.detail.value
  },
  bindButtonTap: function() {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: ['front','back'],
      success: function(res) {
        console.log(res)
        that.setData({
          src: res.tempFilePath
        })
      }
    })
  },
  bindSendDanmu: function () {
    this.videoContext.sendDanmu({
      text: this.inputValue,
      color: getRandomColor()
    })
  },
  onLoad:function(options){
      var that=this;
     wx.getSystemInfo({
      success: function(res) {
        console.log(res.windowHeight)
        that.setData({
          scrollHeight: res.windowHeight -350
        })
      }
    })
  
        console.log(options.id)
        wx.request({
          url: 'http://www.luoxia.online/php/weixinvedio.php',
          data: {},
          method: 'GET',
          success: function(res){
            console.log(res.data[0].url)
            for(var i=0;i<res.data.length;i++){
               if(res.data[i].id==options.id){
                    that.setData({
                          dataList:res.data[i]
                    })
               }
            }
          },
        
        })
  }
})