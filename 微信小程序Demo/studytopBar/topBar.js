// pages/studytopBar/topBar.js
Page({
   
  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,    //当前的当行页
    navScrollLeft: 0,//控制是点中的元素居中
    windowHeight:0,
    widowWidth:0,
    pixelRatio:0, //像素比
    navData: [
      {
        text: '首页'
      },
      {
        text: '健康'
      },
      {
        text: '情感'
      },
      {
        text: '职场'
      },
      {
        text: '育儿'
      },
      {
        text: '纠纷'
      },
      {
        text: '青葱'
      },
      {
        text: '上课'
      },
      {
        text: '下课'
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
       success: (res)=>{
         console.log(res);
         let windowHeight=res.widthHeight;
         let widowWidth=res.widowWidth;
         this.setData({
           pixelRatio: res.pixelRatio,
           widowWidth:res.windowWidth,
           windowHeight:res.windowHeight,
         })
       },
       fail:function()
       {
         console.log("执行失败了")
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

  },
  switchNav:function(e)
  {
    let current=e.currentTarget.dataset.current;
    //每个tab选项宽度占整个的 1/5
    let singleNavWith=this.data.widowWidth/5;
    //tabBar选项居中
    this.setData({
      navScrollLeft: (current-2)*singleNavWith
    });
    console.log((current - 2) * singleNavWith);
    if (this.data.currentTab == current)
    {
      return false;
    }else
    {
      this.setData({
        currentTab: current
      })
    }
  },
  switchTab:function(e)
  {
    let current = e.detail.current;
    let singleNavWidth=this.data.widowWidth/5;
    console.log((current - 2) * singleNavWidth);
    this.setData({
      currentTab: current,
      navScrollLeft:(current-2)*singleNavWidth
    })
  }
})