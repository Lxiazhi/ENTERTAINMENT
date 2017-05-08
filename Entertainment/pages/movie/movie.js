// pages/movie/movie.js
Page({
    data:{
    scrollHeight:0,
    dataList:[],
     lunbo:{
        imgUrls:[
            'http://pic2.qiyipic.com/common/lego/20170503/ef4494e0b26d4deaa3572174980c35b2.jpg',
            'http://pic3.qiyipic.com/common/20141125/5da430a9e2584c888d5635b5e250db34.jpg',
            'http://pic6.qiyipic.com/common/20141125/b675c10158db487e992631704930152f.jpg'
          ],
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 1000
     }
    
  },
 
  onLoad:function(options){
    var that=this;
    wx.getSystemInfo({
      success: function(res) {
        console.log(res.windowHeight)
        that.setData({
          scrollHeight: res.windowHeight -250
        })
      }
    })

    wx.request({
      url: 'http://www.luoxia.online/php/TV.php',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        that.setData({
          dataList:res.data
        })
      }
      
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  handle:function(ev){
     var num=ev.currentTarget.dataset.id
    wx.navigateTo({
      url: '../moviedetail/moviedetail?id='+num
    })
  }
})