// pages/audio/audio.js
var flag=true;
Page({
  data:{
    bg:"../../public/image/icon/stop.png",
    time:"00:00",
    lrc:{},
    current:0,
    music:{
     
    },
    showlrc:'',
    musicList:[],
    scrollHeight:0
  },
  onLoad:function(options){
    var that=this;
 wx.getSystemInfo({
      success: function(res) {
        console.log(res.windowHeight)
        that.setData({
          scrollHeight: res.windowHeight -230
        })
      }
    })



    wx.request({
      url: 'http://www.luoxia.online/php/weixinmusic.php', //仅为示例，并非真实的接口地址
      data: {
        
      },
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data)
        console.log(that.data.musicList,1111)
        console.log()
        that.setData({
          musicList:res.data,
          music:res.data[0],
        })
      }
   })



  },
  onReady:function(){
     this.audioCtx = wx.createAudioContext('myAudio');
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
  playMusic:function(ev){
    var that=this;
    console.log(ev)
    var idx = ev.target.dataset.idx;
     console.log(this.data.musicList[idx])
    that.setData({
      music:this.data.musicList[idx],
      bg:"../../public/image/icon/play.png",
    })
    //500秒后播放
     setTimeout(function(){
       that.audioCtx.play();
    },500)
   flag=false;
  },
  endedHandle:function(){
    var that = this;
    var pos = 0;
    if( that.data.music.id >= that.data.musicList.length ){
      pos = 0;
    }else{
      pos = that.data.music.id ;//如果当前id是3
    }

    var playingMusic= that.data.musicList[pos];//从0开始取第三个
    that.setData({
      music: playingMusic,
      bg:"../../public/image/icon/play.png"
    })

    setTimeout(function(){
      that.audioCtx.play();
    },500)
    flag=false;
  },
  dur:function(ev){
    var that=this;
     var zhi=parseInt(ev.detail.currentTime)
     var lrczhi=parseInt(zhi);
     var b=0;
         console.log(zhi)
         if(zhi/60<1){
            if(zhi<10){
              b="00:0"+zhi;
            }else{
              b="00:"+zhi
            }
         }else{
             if(Math.floor(zhi/60)<10){
               if(zhi%60<10){
                    b="0"+Math.floor(zhi/60)+":"+"0"+zhi%60
               }else{
                   b="0"+Math.floor(zhi/60)+":"+zhi%60
               }
             }else{
                if(zhi%60<10){
                     b=Math.floor+":"+"0"+zhi%60
                }else{
                      b=Math.floor+":"+zhi%60
                }
               
             }

         }
        var pre=zhi/ev.detail.duration;
       this.setData({
         current:parseInt(pre*100),
         time:b
         }
       )
   
  },
  bo:function(){
     if(flag){
        this.setData({
          bg:"../../public/image/icon/play.png"
        })
       
        this.audioCtx.play();
        flag=false;
     }else{
        this.setData({
          bg:"../../public/image/icon/stop.png"
        })
        this.audioCtx.pause();
        flag=true
     }  
  },
  handlelast:function(){
    var that=this;
    var po=0;
      var cur1=this.data.music.id-2;
      if(cur1<=0){
        po=0
      }else{
        po=this.data.music.id-2
      }
      this.setData({
        music:that.data.musicList[po],
         bg:"../../public/image/icon/play.png"
      })
        
       setTimeout(function(){
            that.audioCtx.play()
       },500) 
          flag=false;
  },
  handlenext:function(){
    var that=this;
     var cur2=this.data.music.id;
     var po=0;
     if(cur2>=this.data.musicList.length){
         po=this.data.musicList.length-1;
     }else{
         po=cur2;
     }
      this.setData({
        music:that.data.musicList[po],
         bg:"../../public/image/icon/play.png"
      })
       setTimeout(function(){
            that.audioCtx.play()
       },500) 
       flag=false;
  },
  parseLyric:function (lrc) {
    var lyrics = lrc.split("\n");
    var lrcObj = {};
    for(var i=0;i<lyrics.length;i++){
        var lyric = decodeURIComponent(lyrics[i]);
        var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
        var timeRegExpArr = lyric.match(timeReg);
        if(!timeRegExpArr)continue;
        var clause = lyric.replace(timeReg,'');
        for(var k = 0,h = timeRegExpArr.length;k < h;k++) {
            var t = timeRegExpArr[k];
            var min = Number(String(t.match(/\[\d*/i)).slice(1)),
                sec = Number(String(t.match(/\:\d*/i)).slice(1));
            var time = min * 60 + sec;
            lrcObj[time] = clause;
        }
    }
    return lrcObj;
  }
 
})
function parseLyric(lrc) {
  var lyrics = lrc.split("\n");
  var lrcObj = {};
  for (var i = 0; i < lyrics.length; i++) {
    var lyric = decodeURIComponent(lyrics[i]);
    var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
    var timeRegExpArr = lyric.match(timeReg);
    if (!timeRegExpArr) continue;
    var clause = lyric.replace(timeReg, '');
    for (var k = 0, h = timeRegExpArr.length; k < h; k++) {
      var t = timeRegExpArr[k];
      var min = Number(String(t.match(/\[\d*/i)).slice(1)),
        sec = Number(String(t.match(/\:\d*/i)).slice(1));
      var time = min * 60 + sec;
      lrcObj[time] = clause;
    }
  }
  return lrcObj;
}
