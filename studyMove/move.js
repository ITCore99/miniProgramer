Page({

  /**
   * 页面的初始数据
   */
  data: {
    delBtnWidth:180, //定义删除按钮的宽度
    data: [{ content: "1、为了让用户的体验效果有一个很大的提升，在删除 单行信息 的 时候，我们逐渐从点击删除到向左 滑动实现删除 ", right: 0 }, { content: "2", right: 0 }, { content: "3",                right: 0 }, { content: "4", right: 0 }, { content: "5", right: 0 }, {                  content: "6",     right: 0 }, { content: "7", right: 0 }, { content: "8",              right: 0 }, { content: "9", right: 0 }, { content: "10", right: 0 }],
    windowHeight:0,//定义窗口的高度
    startX:""//记录手指开始的位置
  
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
  onUnload: function () 
  { 

    this.initEleWidth();
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
  /**
   * 手指开始滑动的函数
   */
  touchS:function(e)
  {
    console.log("开始触摸",e);
    if(e.touches.length==1)
    {
      this.setData({
        startX: e.touches[0].clientX,  //记录初始时手指的位置
      })
    }
  },
  /**
   * 手指移动函数
   */
  touchM: function(e)
  {
    if(e.touches.length==1)
    {
      var movex=e.touches[0].clientX; //手指移动时水平方向的位置
      var disX=this.data.startX-movex;//手指起始位置与移动之间的差值
      var delBtnWidth=this.data.delBtnWidth;
      var txtStyle="";
      if (disX == 0 || disX < 0) //如果移动距离小于等于0，说明向右滑动，文本层位置不变
      {
        txtStyle="left:0px"
      } else if (disX > 0)   //移动距离大于0，文本层left值等于手指移动距离
      {
        txtStyle="left:-"+disX+"px";
        if (disX >= delBtnWidth)  //控制手指移动距离最大值为删除按钮的宽度
        {
           txtStyle = "left:-" + delBtnWidth + "px";    
        }
      }
      //获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index;
      var list=this.data.data;
      list[index].txtStyle=txtStyle;
      //更新列表
      this.setData({
        data:list,
      })
    }
  },
  touchE:function(e)
  {
    if(e.touches.length==1)
    {
      var endX=e.touches[0].clientX; //手指移动结束后的水平位置
      var disX=this.data.startX-endX; //触摸结束与开始手指移动的距离
      var delBtnWidth = this.data.delBtnWidth;
     //如果距离小于删除按钮的1/2，不显示删除按钮
      var txtStyle = disX > delBtnWidth/2 ? "left:-"+delBtnWidth+"px":"left:0px";   
      //获取触摸的哪一项
      var index=e.currentTarget.dataset.index;
      var list=this.data.data;
      list[index].txtStyle=txtStyle;
      this.setData({
        data:list,
      })
    }
  },
  //获取元素自适应后的实际宽度
  getEleWidth: function (w) {
    var real = 0;
    try {
      var res = wx.getSystemInfoSync().windowWidth;
      var scale = (750 / 2) / (w / 2);//以宽度750px设计稿做宽度的自适应
      real = Math.floor(res / scale);
      return real;
    } catch (e) {
      return false;
      // Do something when catch error
    }
  },
  initEleWidth: function () {
    var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
    this.setData({
      delBtnWidth: delBtnWidth
    });
  },
  /**
   * 删除事件
   *
   */
  HandlerDel:function(e)
  {
     var index=e.currentTarget.dataset.index;
     console.log("滑动的是第几个",index);
     let list=this.data.data;
    list.splice(index, 1);
     this.setData({
       data: list
     })
  }
})