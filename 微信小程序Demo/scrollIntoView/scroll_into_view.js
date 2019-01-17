// 苗店连接的实现
Page({

  /**
   * 页面的初始数据
   */
  data: 
  {
     windowHeight:0,
     part:"one",
    list: [{ id:"one", text: "天文" }, { id: "two", text:"地理" }, {    id: "three", text: "动物" }, {id: "four", text:"实行" },]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options)
   {
    let that=this;
    console.log("我执行了")
    wx.getSystemInfo({
       sucess:function(res)
       {
         console.log("成功了",res);
         that.setData({
           windowHeight:res.windowHeight
         });
       },
       fail:function(err)
       {
         console.log("我失败",err);
       }
     });
    
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
    console.log(this.data.windowHeight);
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
  jump:function(e)
  {
    console.log(e)
     let part=e.currentTarget.dataset.part;
     this.setData({
       part: part
     })
  }
  /**
   * 实现这个功能的重点是：
   * 1、page：100%；
   * 2、scroll-view ：height：100%；
   * 3、scroll-view：只能作为最外层的容器；
   * 4、赋值 scroll-into-view 是苗店元素的ID
   * 5、设置滚动方向：
   * 6、跳到的标志位置要使用id
   */
})