// share/share.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    portrait_temp:"", //缓存头像图片
    qrcode_temp:"",//缓存二维码图片
    windowHeight:"550px",
    scale:"", //缩放比列
    windowWidth:'375px'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) 
  {    
       let that = this; 
      wx.getSystemInfoSync({
        success:function(res)
        {
          that.setData({
            windowWidth:res.windowWidth,
            windowHeight:res.windowHeight,
          })
        }
      })
      wx.downloadFile({
            url:'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epXTFln55rcpo1RMibVZK956ars48pLBg8QQJbPxP14dibL0pwZ8Xj2dKhIRrQ0nDteOurxMCHiaBL9A/132',
      success:function(res1)  
      {   
         /***缓存头像 图片*/
        console.log("res1",res1); 
        that.setData({
          portrait_temp:res1.tempFilePath
        });

        //缓存canvas绘制小程序的二维码
        wx.downloadFile({
          url:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3809639039,1794457840&fm=27&gp=0.jpg",
          success:function(res2)
          {
            console.log("二维码",res2.tempFilePath);
            //缓存二维码
            that.setData({
              qrcode_temp: res2.tempFilePath
            });

            //开始绘制
            console.log("开始绘制图片");
            that.drawImage();
            setTimeout(function(){
              that.canvasToImage()
            },2000)
          },
        })
      }     
  })
},  
/**
 * 使用canvas进行图片的绘制
 */
drawImage()
{
  //绘制canvas图片
  var that=this;
  const ctx = wx.createCanvasContext('myCanvas') //获取canvas实例
  
  var portraitPath = that.data.portrait_temp;       //获取到头像    
  var hostNickname="不看谢谢";   //获取到昵称

  var qrPath = that.data.qrcode_temp;   //获取到二维码图片;
  var windowWidth = parseInt(that.data.windowWidth) ; //获取到窗口的大小
 
  that.setData({     //设置缩放比例 
    scale: 1.6
  });

 
  //绘制头像
  ctx.save();
  ctx.beginPath();
  /**画一个圆*/
  ctx.arc(windowWidth / 2, 0.32 * windowWidth, 0.15 * windowWidth, 0, 2 * Math.PI);
  /**对前面所画的区域进行裁剪,后面的内容将被限制在这个区域内使用save对当前的画布进行保存，且可以使用restore恢复*/
  ctx.clip(); 
  /**绘制图片到画布上 */
  ctx.drawImage(portraitPath, 0.7 * windowWidth / 2, 0.17 * windowWidth, 0.3 * windowWidth, 0.3 * windowWidth)
  /**恢复之前保存的绘图上下文 */
  ctx.restore()


  //绘制第一段文本
  ctx.beginPath();
  /**填充色** */
  ctx.setFillStyle('#000');
  /**字体大小 */
  ctx.setFontSize(0.037 * windowWidth);
  /**设置字体的排列方式 */
  ctx.setTextAlign('center');
  /**在画布上绘制填充文本*/ 
  ctx.fillText(hostNickname + ' 正在参加疯狂红包活动', windowWidth / 2, 0.52 * windowWidth);


  //绘制第二段文本
  ctx.beginPath();
  ctx.setFillStyle('#000');
  ctx.setFontSize(0.037 * windowWidth);
  ctx.setTextAlign('center');
  ctx.fillText('邀请你一起来领券抢红包啦~', windowWidth / 2, 0.57 * windowWidth);


  //绘制二维码
  ctx.drawImage(qrPath, 0.6* windowWidth / 2, 0.7 * windowWidth, 0.36 * windowWidth, 0.36 * windowWidth)


  //绘制第三段文本
  ctx.setFillStyle('#666')
  ctx.setFontSize(0.037 * windowWidth)
  ctx.setTextAlign('center')
  ctx.fillText('长按二维码领红包', windowWidth / 2,1.15 * windowWidth)
  ctx.draw();
},
/**
 * 将canvas绘制出来的图片进行转化为图片
 */
canvasToImage:function() /***把当前画布指定区域内容导出生成指定大小的图片 */
{
   var that=this;
   wx.canvasToTempFilePath({
     x:0,                         //指定画布的x坐标
     y:0,                         //指定到画布的与轴坐标
     width:that.data.windowWidth, //指定画布的宽度
     height:that.data.windowWidth*that.data.scale,//指定画布的高度
     destWidth:that.data.windowWidth * 4 , //输出图片的宽度
     destHeight:that.data.windowHeight*4*that.data.scale, //输出指定画布的高度
     canvasId: "myCanvas",            //画布标识符
     fileType: 'jpg',//此参数可以确保
     success:function(res)
     {
        console.log("朋友圈分享图生成成功"+res.tempFilePath);
        // wx.previewImage({   //图片预览api
        // current: res.tempFilePath,  // 当前显示图片的http链接
        // urls: [res.tempFilePath],  // 需要预览的图片http链接列表
        // });
        wx.authorize({  //将图片保存到相册中
          scope: 'scope.writePhotosAlbum',
          success:function()
          {
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success:function(){
                wx.showModal({
                  title: 'tips',
                  content: '图片保存成功，赶紧去分享',
                })
              }
            })
          }
          
        })

     },
     fail:function(err)
     {
         console.log("生成图片错误",err);
     }
   })
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})