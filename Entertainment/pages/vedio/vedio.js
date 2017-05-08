 
 var page=1;
 var datalist=[];
 var getData=function(that){
     that.setData({
          hidden:false
        })
   wx.request({
     url: 'https://www.imooc.com/course/ajaxlist',
     data: {
       page:page
     },
     method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
     // header: {}, // 设置请求的 header
     success: function(res){
         var zhi=res.data.list;
         console.log(res)
         for(var i=0;i<zhi.length;i++){
               datalist.push(zhi[i])
         }
        that.setData({
          vedio:datalist
        })
        page++;
         that.setData({
          hidden:true
        })
      }
     
   })

 }











Page({
  data:{
    scrollHeight:0,
    hidden:true,
     lunbo:{
  imgUrls:[
      'http://www.maiziedu.com/uploads/course/2016/07/1_iMX6sCr.png',
      'http://www.maiziedu.com/uploads/course/2016/04/PhotoShop-sz.png',
      'http://www.maiziedu.com/uploads/course/2016/04/ydUIsjsz.png'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
     },
     vedio:[]
  },
  onLoad:function(options){
    var that=this;
    // 页面初始化 options为页面跳转所带来的参数
     wx.getSystemInfo({
      success: function(res) {
        console.log(res.windowHeight)
        that.setData({
          scrollHeight: res.windowHeight -80
        })
      }
    })

    getData(this)




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
      url: '../detail/detail?id='+num
   })
  },
  loadmore:function(){
    getData(this)
  },
  fresh:function(){
    this.setData({
      vedio:[]
    })
    getData(this) 
  }




})