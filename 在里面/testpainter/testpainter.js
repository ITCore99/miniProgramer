// pages/testpainter/testpainter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: {                       background:"https://qhyxpicoss.kujiale.com/2018/06/12/LMPUSDAKAEBKKOASAAAAAAY8_981x600.png",
    width:'654rpx',
    height:'400rpx',
    borderRadius:'20rpx',
    views:[
      {
        type:'text',
        text:'painter fzn 前端',
        css:{
          left:'20rpx',
          top:'50rpx',
          fontSize:'40rpx',
          color:'#fff',
          fontWeight:'400',
          rotate:'6', 
          align:'left'
        }
      },
      {
        type: 'image',
        url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=415529631,3012801483&fm=27&gp=0.jpg',
        css:{
          top: '48rpx',
          left: '448rpx',
          width: '192rpx',
          height: '192rpx',
          borderRadius: '96rpx',
        }
      }
    ]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  onImgOK:function(e)
  {
    this.imagePath=e.detail.path;
    if (this.imagePath)
    {
      wx.saveImageToPhotosAlbum({
        filePath: this.imagePath,
        success:function()
        {
          wx.showModal({
            title: '提示',
            content: '海报生成成功赶紧去分享！',
          })
        }
      })
    }
    
  }
})