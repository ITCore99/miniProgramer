const DATE_YEAR=new Date().getFullYear();
const DATE_MONTH=new Date().getMonth()+1;
const DATE_DAY=new Date().getDate();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    DATE_MONTH: DATE_MONTH,
    year:new Date().getFullYear(), //获取当前的年
    month:new Date().getMonth()+1, //获取当前的月
    day:new Date().getDate(),//获取当前的日
    weekArrs:['日','一','二','三','四','五','六'],
    dateArr:[],//要渲染的数据,
    isShow:false,// 判断是否出现上一个月的按钮
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(this.getTotalDayByMonth(2019,3));
    // console.log(this.getWeek(2019,3,1));
    this.createDateListData();
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
   /**
    * 获取月份数据
    */
  createDateListData(setYear,setMonth)
  {
     let dateArr=[]; //要渲染的的数组
     let dataArrLen=0; //要渲染数组的长度
    console.log("setYear", setYear, "setMonth", setMonth)
    let now = setYear != undefined && setMonth !=undefined ? new Date(setYear, setMonth) : new Date();// 获取当前时间独享
     let year=now.getFullYear();//获取年份
     let month=now.getMonth()+1;//获取月份
     let monthTotalDays=this.getTotalDayByMonth(year,month,0);//获取这月有多少天
     console.log("获取的总天数", monthTotalDays)
     let startWeek = this.getWeek(year,month,1);//获取这月的开始是星期几
     console.log("获取的首日是星期几", startWeek)
    for (let j = -startWeek + 1; j <= monthTotalDays; j++) //注-startWeek + 1是非常的精髓的
    { 
       let tempweek
       if(j>0)
       {
         tempweek = this.getWeek(year,month,j);//获取每一天是星期几
       }
       let available=true;
       if(j<DATE_DAY&&year==DATE_YEAR&&month==DATE_MONTH)//在这之前的天数不可用
       {
          available=false;
       }
       dateArr.push({
         day:j,
         week:tempweek,
         available,
         amount: '￥99.8'
       })
    }
    this.setData({
      dateArr
    })

  },
  /**
   * 获取每个月的总天数 原理是这个月的第凌天就是上个月的左后一天
   */
  getTotalDayByMonth(year,month)
  {
    let days = new Date(year,month,0).getDate();
    return days;
  },
  /**
   * 是星期几
   */
  getWeek(year,month,day)
  {
    console.log("参数", year, month)
    let startWeek=new Date(year,month-1,day).getDay();
    return startWeek
  },
  /**
   * 点击函数
   */
  clickItem(e)
  {
    let {year,month,day}=e.currentTarget.dataset;
    console.log("我点击的item",year,month,day);
  },
  /**
   * 点击月份的改变
   */
  changeMonth(e)
  {

   let {flag}=e.currentTarget.dataset;
    console.log("执行了",flag);
   if(flag==="0") //上一个月
   {
     let year=this.data.month-2 < 0 ? this.data.year-1 : this.data.year;
     let month = this.data.month-2 <0 ?  12  : --this.data.month;
     if (year == DATE_YEAR && month<=DATE_MONTH )//如果是当前年当前月的话上一个的按钮隐藏
     {
       this.setData({
         isShow:false,
         year,
         month
       })
     }else{
       this.setData({
         isShow:true,
         year,
         month
       })
     }
    
     this.createDateListData(this.data.year, this.data.month - 1);
      
   }else if(flag)//下一个月
   {
     let year = this.data.month+1 >12 ? this.data.year +1 : this.data.year;
     console.log("year",year);
     let month = this.data.month+1 >12 ? 1: ++this.data.month;
     this.setData({
       isShow:true,
       year,
       month
     })
     this.createDateListData(this.data.year,this.data.month-1);
   }
  }
})