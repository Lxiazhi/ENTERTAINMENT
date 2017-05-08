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
  inputValue: '',
  data:{
     scrollHeight:0,
        src: '',
    danmuList: [
      {
        
      },
      {
        
    }],
    detail:{}
  },
   bindInputBlur: function(e) {
    this.inputValue = e.detail.value
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
          scrollHeight: res.windowHeight -260
        })
      }
      })
   
    wx.request({
      url: "http://www.luoxia.online/php/moviedata.php",
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){

        console.log(res.data)
        for(var i=0;i<res.data.length;i++){
          if(res.data[i].id==options.id){
            console.log(res.data[i])
            that.setData({
                  detail:res.data[i]
            })
          }
        }
         

      }
    })

  },
  onReady:function(){
    this.videoContext = wx.createVideoContext('myVideo')
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})